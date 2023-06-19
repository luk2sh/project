import {
	BadRequestException,
	ConflictException,
	ForbiddenException,
	Injectable,
	Logger,
	NotFoundException,
} from '@nestjs/common';
import {
	emailNotFound,
	passwordNotValid,
	SignInDto,
	userAlreadyExist,
	hashData,
	isMatch,
	SignInResponse,
	TokensDto,
	userNotFound,
	JwtPayload,
	UserResponse,
	LoggerServiceDecorator,
	httpBadRequest,
	pincodeNotValid,
	UserDeviceEnum,
	IntermediateResponse,
	devicesWithoutIntermediateTokens,
	IJwtPayload,
} from 'src/common';
import { UsersRepository } from 'src/repository';
import { UsersService } from '../../users/services/users.service';
import { JwtService } from '@nestjs/jwt';
import { getAuthConfig, getClientUrl } from 'src/config';
import { User } from 'src/models';
import { v4 as uuidv4 } from 'uuid';
import { MailService } from '../../mail/services/mail.service';

@Injectable()
export class AuthService {
	private readonly logger = new Logger(AuthService.name);
	private readonly at_secret: string;
	private readonly at_secret_exp: string;
	private readonly rt_secret: string;
	private readonly intermediate_secret_exp: string;
	private readonly intermediate_secret: string;
	private readonly rt_secret_exp: string;
	private readonly clientUrl: string;
	constructor(
		private jwtService: JwtService,
		private userRepository: UsersRepository,
		private userService: UsersService,
		private mailService: MailService
	) {
		const {
			atSecret,
			atSecretExpires,
			rtSecret,
			rtSecretExpires,
			intermediateSecret,
			intermediateSecretExpires,
		} = getAuthConfig();
		this.clientUrl = getClientUrl();
		this.at_secret = atSecret;
		this.at_secret_exp = atSecretExpires;
		this.rt_secret = rtSecret;
		this.rt_secret_exp = rtSecretExpires;
		this.intermediate_secret = intermediateSecret;
		this.intermediate_secret_exp = intermediateSecretExpires;
	}

	@LoggerServiceDecorator()
	async getTokens(id: string, email: string): Promise<TokensDto> {
		const payload = { id, email };

		const [at, rt] = await Promise.all([
			this.jwtService.signAsync(payload, {
				secret: this.at_secret,
				expiresIn: this.at_secret_exp,
			}),
			this.jwtService.signAsync(payload, {
				secret: this.rt_secret,
				expiresIn: this.rt_secret_exp,
			}),
		]);

		return {
			accessToken: at,
			refreshToken: rt,
		};
	}

	@LoggerServiceDecorator()
	async getIntermediateToken(id: string, email: string): Promise<string> {
		const payload = { id, email };

		const intermediateToken = await this.jwtService.signAsync(payload, {
			secret: this.intermediate_secret,
			expiresIn: this.intermediate_secret_exp,
		});

		return intermediateToken;
	}
	@LoggerServiceDecorator()
	async updateUserFieldWithHash(
		id: string,
		field: string,
		value: string
	): Promise<User> {
		const hashedValue = await hashData(value);
		const updateData = { [field]: hashedValue };
		await this.userRepository.update(id, updateData);
		return this.userRepository.getUsersById(id);
	}

	@LoggerServiceDecorator()
	async verify(id: string): Promise<User> {
		try {
			return await this.userRepository.getUsersById(id);
		} catch (err) {
			throw new NotFoundException(userNotFound);
		}
	}

	@LoggerServiceDecorator()
	async refreshTokens(id: string, refreshToken: string): Promise<SignInResponse> {
		const user = await this.userRepository.getUsersById(id);
		if (!user || !user.refreshToken) {
			throw new ForbiddenException(httpBadRequest);
		}
		const rtMatches = isMatch(refreshToken, user.refreshToken);

		if (!rtMatches) {
			throw new ForbiddenException(httpBadRequest);
		}

		const tokens = await this.getTokens(user.id, user.refreshToken);

		await this.updateUserFieldWithHash(user.id, 'refreshToken', user.refreshToken);
		return { ...SignInResponse.mapFrom(user), ...tokens };
	}

	@LoggerServiceDecorator()
	async createUser(
		user: SignInDto,
		deviceType: UserDeviceEnum
	): Promise<SignInResponse | IntermediateResponse> {
		try {
			user.email = user.email.toLowerCase().trim();
			user.password = await hashData(user.password);
			const createUser = await this.userService.create(user);

			return this.checkDevice(createUser, deviceType);
		} catch (err) {
			throw new BadRequestException(err);
		}
	}

	@LoggerServiceDecorator()
	async checkDevice(
		user: User,
		type: UserDeviceEnum
	): Promise<SignInResponse | IntermediateResponse> {
		if (devicesWithoutIntermediateTokens(type)) {
			const tokens = await this.getTokens(user.id, user.email);

			const currentUser = await this.updateUserFieldWithHash(
				user.id,
				'refreshToken',
				tokens.refreshToken
			);

			return { ...UserResponse.mapFrom(currentUser), ...tokens };
		} else {
			const intermediateToken = await this.getIntermediateToken(
				user.id,
				user.email
			);

			await this.updateUserFieldWithHash(
				user.id,
				'intermediateToken',
				intermediateToken
			);

			return {
				intermediateToken,
				code: !!user?.pincode,
			};
		}
	}

	@LoggerServiceDecorator()
	async signInLocal(
		data: SignInDto,
		deviceType: UserDeviceEnum
	): Promise<SignInResponse | IntermediateResponse> {
		const user = await this.userRepository.findOneByEmail(data.email);
		if (!user) {
			throw new NotFoundException(emailNotFound);
		}

		const isCheckPassword = await isMatch(data.password, user.password);

		if (!isCheckPassword) {
			throw new BadRequestException(passwordNotValid);
		}

		return this.checkDevice(user, deviceType);
	}

	@LoggerServiceDecorator()
	async signUpLocal(
		user: SignInDto,
		deviceType: UserDeviceEnum
	): Promise<SignInResponse | IntermediateResponse> {
		const existEmail = await this.userRepository.findOneByEmail(user.email);

		if (existEmail) {
			throw new ConflictException(userAlreadyExist(user.email));
		}

		return this.createUser(user, deviceType);
	}

	@LoggerServiceDecorator()
	async googleAuth(
		googleUser: JwtPayload,
		deviceType: UserDeviceEnum
	): Promise<SignInResponse | IntermediateResponse> {
		const candidate = await this.userRepository.findOneByEmail(googleUser.email);

		if (candidate) {
			return this.checkDevice(candidate, deviceType);
		}

		if (!candidate) {
			const email = googleUser.email;
			const password = uuidv4();
			const payload: SignInDto = {
				email,
				password,
			};
			return this.signUpLocal(payload, deviceType);
		}
	}

	@LoggerServiceDecorator()
	async forgotPassword(email: string): Promise<void> {
		const user = await this.userRepository.findOneByEmail(email);
		if (!user) {
			throw new NotFoundException(emailNotFound);
		}

		const { accessToken } = await this.getTokens(user.id, user.email);
		const link = `${this.clientUrl}/reset-password?token=${accessToken}`;

		await this.mailService.sendForgotPassword(user, link);
	}

	@LoggerServiceDecorator()
	async resetPassword(user: IJwtPayload, oldPassword: string) {
		try {
			const password = await hashData(oldPassword);
			await this.userRepository.update(user.id, { password });
		} catch (e) {
			throw new Error(e);
		}
	}

	@LoggerServiceDecorator()
	async pincodeAuth(candidate: IJwtPayload, code: string): Promise<SignInResponse> {
		const user = await this.userRepository.getUsersById(candidate.id);

		if (!user || !user.pincode) {
			throw new NotFoundException(userNotFound);
		}

		const pinMatch = await isMatch(code, user.pincode);

		if (!pinMatch) {
			throw new BadRequestException(pincodeNotValid);
		}

		const tokens = await this.getTokens(user.id, user.email);
		await this.updateUserFieldWithHash(user.id, 'refreshToken', tokens.refreshToken);

		return { ...SignInResponse.mapFrom(user), ...tokens };
	}

	@LoggerServiceDecorator()
	async createPincode(user: IJwtPayload, pincode: string): Promise<SignInResponse> {
		await this.updateUserFieldWithHash(user.id, 'pincode', pincode);

		const tokens = await this.getTokens(user.id, user.email);

		const candidate = await this.updateUserFieldWithHash(
			user.id,
			'refreshToken',
			tokens.refreshToken
		);

		return { ...SignInResponse.mapFrom(candidate), ...tokens };
	}

	@LoggerServiceDecorator()
	async resetPincode(user: IJwtPayload, pincode: string): Promise<void> {
		try {
			await this.updateUserFieldWithHash(user.id, 'pincode', pincode);
		} catch (e) {
			throw new Error(e);
		}
	}

	@LoggerServiceDecorator()
	async checkPersonId(user: IJwtPayload): Promise<SignInResponse> {
		const token = await this.getTokens(user.id, user.email);

		const candidate = await this.updateUserFieldWithHash(
			user.id,
			'refreshToken',
			token.refreshToken
		);

		return { ...SignInResponse.mapFrom(candidate), ...token };
	}
}

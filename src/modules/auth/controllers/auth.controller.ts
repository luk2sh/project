import {
	Body,
	Controller,
	HttpCode,
	HttpStatus,
	Param,
	Post,
	Query,
	UseGuards,
} from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiOkResponse,
	ApiOperation,
	ApiQuery,
	ApiResponse,
	ApiTags,
} from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import {
	SignInDto,
	UserResponse,
	Public,
	HttpUser,
	SignInResponse,
	IJwtPayload,
	LoggerApi,
	RtGuard,
	GoogleAuth,
	IntermediateGuard,
	IntermediateResponse,
	UserDeviceEnum,
} from 'src/common';

@Controller('/auth')
@ApiTags('auth')
@LoggerApi()
export class AuthController {
	constructor(private authService: AuthService) {}

	@Public()
	@Post('local/signin')
	@ApiOperation({ summary: '[LocalSignIn]', description: 'Local SignIn' })
	@ApiResponse({ type: SignInResponse })
	@ApiOkResponse({ type: IntermediateResponse })
	@HttpCode(HttpStatus.OK)
	@ApiQuery({ name: 'deviceType', enum: UserDeviceEnum })
	async signInLocal(
		@Query('deviceType') deviceType: UserDeviceEnum,
		@Body() data: SignInDto
	): Promise<SignInResponse | IntermediateResponse> {
		return this.authService.signInLocal(data, deviceType);
	}

	@Public()
	@Post('local/signup')
	@ApiOperation({ summary: '[LocalSignUp]', description: 'Local SignUp' })
	@HttpCode(HttpStatus.CREATED)
	@ApiResponse({ type: SignInResponse })
	@ApiOkResponse({ type: IntermediateResponse })
	@ApiQuery({ name: 'deviceType', enum: UserDeviceEnum })
	async signUpLocal(
		@Query('deviceType') deviceType: UserDeviceEnum,
		@Body() data: SignInDto
	): Promise<SignInResponse | IntermediateResponse> {
		return this.authService.signUpLocal(data, deviceType);
	}

	@Post('google')
	@GoogleAuth()
	@ApiBearerAuth()
	@ApiOperation({ summary: '[GoogleAuth]', description: 'Google Auth' })
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ type: SignInResponse })
	@ApiOkResponse({ type: IntermediateResponse })
	@ApiQuery({ name: 'deviceType', enum: UserDeviceEnum })
	async googleAuth(
		@Query('deviceType') deviceType: UserDeviceEnum,
		@HttpUser() user: IJwtPayload
	): Promise<UserResponse | IntermediateResponse> {
		return this.authService.googleAuth(user, deviceType);
	}

	@Public()
	@Post('refresh')
	@UseGuards(RtGuard)
	@ApiOperation({ summary: '[Refresh]', description: 'Refresh' })
	@ApiResponse({ type: SignInResponse })
	@ApiBearerAuth()
	@HttpCode(HttpStatus.OK)
	async refreshToken(@HttpUser() user: IJwtPayload): Promise<SignInResponse> {
		return this.authService.refreshTokens(user.id, user.refreshToken);
	}

	@Post('verify')
	@ApiOperation({ summary: '[Verify]', description: 'verify' })
	@ApiBearerAuth()
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ type: UserResponse })
	async verify(@HttpUser() user: IJwtPayload): Promise<UserResponse> {
		return this.authService.verify(user.id).then(UserResponse.mapFrom);
	}

	@Public()
	@Post('forgot-password')
	@ApiOperation({ summary: '[ForgotPassword]', description: 'Forgot password' })
	@HttpCode(HttpStatus.OK)
	async forgotPassword(@Query('email') email: string): Promise<void> {
		await this.authService.forgotPassword(email);
	}

	@Post('reset-password')
	@ApiOperation({ summary: '[ResetPassword]', description: 'Reset password' })
	@ApiBearerAuth()
	@HttpCode(HttpStatus.OK)
	async resetPassword(
		@HttpUser() user: IJwtPayload,
		@Query('password') password: string
	): Promise<void> {
		await this.authService.resetPassword(user, password);
	}

	@Public()
	@Post('pincode/:code')
	@UseGuards(IntermediateGuard)
	@ApiOperation({ summary: '[PincodeAuth]', description: 'Pincode authorizatoni' })
	@ApiBearerAuth()
	@ApiResponse({ type: SignInResponse })
	@HttpCode(HttpStatus.OK)
	async pincodeAuth(
		@Param('code') code: string,
		@HttpUser() user: IJwtPayload
	): Promise<SignInResponse> {
		return this.authService.pincodeAuth(user, code);
	}

	@Public()
	@Post('create-pincode')
	@UseGuards(IntermediateGuard)
	@ApiBearerAuth()
	@ApiOperation({ summary: '[CreatePIN-code]', description: 'Create PIN-code' })
	@ApiResponse({ type: SignInResponse })
	@HttpCode(HttpStatus.OK)
	async createPincode(
		@Query('pincode') pincode: string,
		@HttpUser() user: IJwtPayload
	): Promise<SignInResponse> {
		return this.authService.createPincode(user, pincode);
	}

	@Post('reset-pincode')
	@ApiBearerAuth()
	@ApiOperation({ summary: '[ResetPIN-code]', description: 'Reset PIN-code' })
	@HttpCode(HttpStatus.OK)
	async resetPincode(@Query('pincode') pincode: string, @HttpUser() user: IJwtPayload) {
		await this.authService.resetPincode(user, pincode);
	}

	@Public()
	@Post('check-person-id')
	@ApiResponse({ type: SignInResponse })
	@UseGuards(IntermediateGuard)
	@ApiBearerAuth()
	@HttpCode(HttpStatus.OK)
	async checkPersonId(@HttpUser() user: IJwtPayload) {
		return await this.authService.checkPersonId(user);
	}
}

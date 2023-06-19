import {
	BadRequestException,
	ForbiddenException,
	Injectable,
	Logger,
	Param,
} from '@nestjs/common';
import { UsersRepository } from 'src/repository';
import {
	LoggerServiceDecorator,
	SignInDto,
	UpdateUserRequest,
	userNotCreatedThroughCategories,
	userNotExist,
	UserResponse,
} from 'src/common';
import { User } from 'src/models';
import { CategoryService } from '../../categories/services/category.service';

@Injectable()
export class UsersService {
	private readonly logger = new Logger(UsersService.name);

	constructor(
		private readonly userRepository: UsersRepository,
		private readonly categoryService: CategoryService
	) {}

	@LoggerServiceDecorator()
	async getAllUsers(): Promise<User[]> {
		return this.userRepository.getAllUsers();
	}

	@LoggerServiceDecorator()
	async getUsersById(id: string): Promise<User> {
		return this.userRepository.getUsersById(id);
	}

	@LoggerServiceDecorator()
	async remove(@Param('id') id: string): Promise<void> {
		await this.userRepository.remove(id);
	}

	@LoggerServiceDecorator()
	async create(dto: SignInDto): Promise<User> {
		const user = await this.userRepository.create(dto);
		try {
			await this.categoryService.addBasicCategory(user.id);
		} catch (error) {
			await this.userRepository.remove(user.id);
			throw new ForbiddenException(userNotCreatedThroughCategories);
		}
		return this.userRepository.getUsersById(user.id);
	}

	@LoggerServiceDecorator()
	async update(data: UpdateUserRequest, userId: string): Promise<UserResponse> {
		const user = await this.userRepository.update(userId, { ...data });
		if (!user) {
			throw new BadRequestException(userNotExist);
		}
		return this.userRepository.getUsersById(userId).then(UserResponse.mapFrom);
	}
}

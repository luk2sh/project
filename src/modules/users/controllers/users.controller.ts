import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Patch,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from '../services/users.service';
import { HttpUser, IJwtPayload, LoggerApi, UserResponse } from 'src/common';
import { UpdateUserRequest } from 'src/common';

@ApiBearerAuth()
@Controller('users')
@ApiTags('users')
@LoggerApi()
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get()
	@ApiOperation({ summary: '[GetAllUsers]', description: 'get all users' })
	@ApiResponse({ type: UserResponse, isArray: true })
	@HttpCode(HttpStatus.OK)
	async getAllUsers(): Promise<UserResponse[]> {
		return this.usersService.getAllUsers().then(UserResponse.mapFromMulti);
	}

	@Get(':id')
	@ApiOperation({ summary: '[GetUserById]', description: 'get user' })
	@ApiResponse({ type: UserResponse })
	@HttpCode(HttpStatus.OK)
	async getUsersById(@Param('id') id: string): Promise<UserResponse> {
		return this.usersService.getUsersById(id).then(UserResponse.mapFrom);
	}

	@Delete(':id')
	@ApiOperation({ summary: '[DeleteUser]', description: 'delete user' })
	@HttpCode(HttpStatus.OK)
	async remove(@Param('id') id: string): Promise<void> {
		await this.usersService.remove(id);
	}

	@Patch()
	@ApiOperation({ summary: '[UpdateUser]', description: 'update user' })
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ type: UserResponse })
	async update(
		@HttpUser() user: IJwtPayload,
		@Body() dto: UpdateUserRequest
	): Promise<UserResponse> {
		return this.usersService.update(dto, user.id);
	}
}

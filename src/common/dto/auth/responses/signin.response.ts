import { UserResponse } from '../../users';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class SignInResponse extends UserResponse {
	@ApiProperty({ example: '631774b621ade990770641f5' })
	@IsNotEmpty()
	@Expose()
	@IsString()
	accessToken: string;

	@ApiProperty({ example: '631774b621ade990770641f5' })
	@IsNotEmpty()
	@Expose()
	@IsString()
	refreshToken: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class SignInDto {
	@ApiProperty({ example: 'example@mail.com' })
	@IsNotEmpty()
	@IsEmail()
	@Expose()
	email: string;

	@ApiProperty({ example: '12345678' })
	@IsNotEmpty()
	@IsString()
	password: string;
}

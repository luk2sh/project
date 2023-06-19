import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';

export class ContactUsRequest {
	@ApiProperty({ example: 'email@email.com' })
	@Expose()
	@IsEmail()
	email: string;

	@ApiProperty({ example: 'string' })
	@Expose()
	@IsString()
	description: string;
}

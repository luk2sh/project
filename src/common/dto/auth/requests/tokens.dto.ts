import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class TokensDto {
	@ApiProperty({ example: '1212312312411f14124j4n1k24124' })
	@IsNotEmpty()
	@IsString()
	@Expose()
	accessToken: string;

	@ApiProperty({ example: '1212312312411f14124j4n1k24124' })
	@IsNotEmpty()
	@IsString()
	@Expose()
	refreshToken: string;
}

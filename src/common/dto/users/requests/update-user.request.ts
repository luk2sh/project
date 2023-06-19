import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserRequest {
	@ApiPropertyOptional({ example: 'string' })
	@IsOptional()
	@IsString()
	countryId?: string;

	@ApiPropertyOptional({ example: 'string' })
	@IsOptional()
	@IsString()
	currencyId?: string;
}

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';
import { AccountDto } from '../account.dto';

export class CreateAccountRequest extends AccountDto {
	@ApiPropertyOptional({ example: '1234-5678-9009-8765' })
	@IsString()
	@IsOptional()
	@Expose()
	cardNumber: string;

	@ApiProperty({ example: 'USD' })
	@IsString()
	@Expose()
	currencyId: string;
}

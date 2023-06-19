import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { AccountTypeEnum } from 'src/common/enums';

export class AccountDto {
	@ApiProperty({ example: 'Monobank' })
	@Expose()
	@IsString()
	name: string;

	@ApiPropertyOptional({ example: 'Visa' })
	@Expose()
	@IsOptional()
	@IsString()
	description?: string;

	@ApiProperty({ example: '123214' })
	@Expose()
	@IsNumber()
	balance: number;

	@ApiProperty({ example: AccountTypeEnum.Cash })
	@IsEnum(AccountTypeEnum)
	@Expose()
	type: AccountTypeEnum;
}

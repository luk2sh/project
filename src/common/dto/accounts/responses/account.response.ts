import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToClass, Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Account, Budget, BudgetAccount } from 'src/models/';
import { AccountDto } from '../account.dto';
import { TransactionResponse } from 'src/common';

export class AccountResponse extends AccountDto {
	@ApiProperty({ example: '231342124414' })
	@IsString()
	@Expose()
	id: string;

	@ApiProperty({ example: '231342124414' })
	@IsString()
	@IsOptional()
	@Expose()
	cardNumber?: string;

	@ApiProperty({ example: 'USD' })
	@IsString()
	@Expose()
	currencyId: string;

	@ApiProperty({ example: '123' })
	@IsNumber()
	@Expose()
	income: number;

	@ApiProperty({ example: '-123' })
	@IsNumber()
	@Expose()
	expense: number;

	@ApiProperty({ type: TransactionResponse, isArray: true })
	@Expose()
	@Type(() => TransactionResponse)
	@ValidateNested()
	transactions: TransactionResponse[];

	@ApiProperty({ type: BudgetAccount, isArray: true })
	@Expose()
	@Type(() => BudgetAccount)
	@ValidateNested()
	budgets: Budget[];

	static mapFrom(account: Account): AccountResponse {
		return plainToClass(AccountResponse, account, {
			excludeExtraneousValues: true,
		});
	}

	static mapFromMulti(accounts: Account[]): AccountResponse[] {
		return accounts.map(AccountResponse.mapFrom);
	}
}

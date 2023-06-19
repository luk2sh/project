import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Expose, plainToClass } from 'class-transformer';
import { Transaction } from 'src/models';

export class TransactionResponse {
	@ApiProperty({ example: '131314.r43f3g2.232f2.33f23' })
	@IsString()
	@Expose()
	id: string;

	@ApiProperty({ example: '223.45' })
	@IsNumber()
	@Expose()
	amount: number;

	@ApiProperty({ example: 'USD' })
	@IsString()
	@Expose()
	currencyId: string;

	@ApiProperty({ example: 'Decoration' })
	@IsString()
	@Expose()
	categoryId: string;

	@ApiProperty({ example: 'Flowers' })
	@IsString()
	@IsOptional()
	@Expose()
	subCategoryId?: string;

	@ApiProperty({ example: '4132f3qf13r24f232' })
	@IsString()
	@Expose()
	accountId: string;

	static mapFrom(transaction: Transaction): TransactionResponse {
		const currencyId = transaction?.account?.currencyId;
		const data = { ...transaction.dataValues, currencyId };
		return plainToClass(TransactionResponse, data, {
			excludeExtraneousValues: true,
		});
	}

	static mapFromMulti(transactions: Transaction[]): TransactionResponse[] {
		return transactions.map(TransactionResponse.mapFrom);
	}
}

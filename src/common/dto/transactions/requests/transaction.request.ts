import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class TransactionRequest {
	@ApiProperty({ example: '12.31d.325g' })
	@IsString()
	categoryId: string;

	@ApiPropertyOptional({ example: '12.31d.325g' })
	@IsOptional()
	@IsString()
	subCategoryId?: string;

	@ApiProperty({ example: '12.31d.325g' })
	@IsString()
	accountId: string;

	@ApiProperty({ example: 334.47 })
	@IsNumber()
	amount: number;
}

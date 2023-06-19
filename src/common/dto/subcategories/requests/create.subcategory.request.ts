import { SubcategoryDto } from '../subcategory.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class SubcategoryRequest extends SubcategoryDto {
	@ApiProperty({ example: 'dwrewr242342r23r' })
	@Expose()
	userId: string;
}

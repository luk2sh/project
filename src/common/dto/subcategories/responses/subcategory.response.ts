import { SubcategoryDto } from '../subcategory.dto';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToClass } from 'class-transformer';
import { Subcategory } from 'src/models';

export class SubcategoryResponse extends SubcategoryDto {
	@ApiProperty({ example: '342v232f2v' })
	@IsString()
	@Expose()
	id: string;

	static mapFrom(subcategory: Subcategory): SubcategoryResponse {
		return plainToClass(SubcategoryResponse, subcategory, {
			excludeExtraneousValues: true,
		});
	}

	static mapFromMulti(subcategories: Subcategory[]): SubcategoryResponse[] {
		return subcategories.map(SubcategoryResponse.mapFrom);
	}
}

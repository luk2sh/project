import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToClass, Type } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';
import { Category } from 'src/models';
import { CategoryDto } from '../category.dto';
import { SubcategoryResponse } from 'src/common';

export class CategoryResponse extends CategoryDto {
	@ApiProperty({ example: 'string' })
	@Expose()
	@IsString()
	id: string;

	@ApiProperty({ example: '2412342f2f32414f' })
	@IsString()
	@Expose()
	userId: string;

	@ApiProperty({ type: SubcategoryResponse, isArray: true })
	@Expose()
	@Type(() => CategoryResponse)
	@ValidateNested()
	subcategories: SubcategoryResponse[];

	static mapFrom(category: Category): CategoryResponse {
		return plainToClass(CategoryResponse, category, {
			excludeExtraneousValues: true,
		});
	}

	static mapFromMulti(categories: Category[]): CategoryResponse[] {
		return categories.map(CategoryResponse.mapFrom);
	}
}

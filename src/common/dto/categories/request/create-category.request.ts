import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { CategoryDto } from '../category.dto';

export class CreateCategoryRequest extends CategoryDto {
	@ApiProperty({ example: 'string' })
	@IsString()
	userId: string;
}

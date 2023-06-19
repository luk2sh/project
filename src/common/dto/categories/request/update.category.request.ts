import { PartialType } from '@nestjs/swagger';
import { CategoryDto } from '../category.dto';

export class UpdateCategoryRequest extends PartialType(CategoryDto) {}

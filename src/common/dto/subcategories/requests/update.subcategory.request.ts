import { PartialType } from '@nestjs/swagger';
import { SubcategoryDto } from '../subcategory.dto';

export class UpdateSubcategoryRequest extends PartialType(SubcategoryDto) {}

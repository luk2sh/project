import { ApiPropertyOptional, IntersectionType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { PaginationDto } from '../../pagination.dto';
import { RangeDto } from '../../range.dto';

export class FindAllTransactionRequest extends IntersectionType(PaginationDto, RangeDto) {
	@ApiPropertyOptional()
	@IsOptional()
	categoryIds?: string[];
}

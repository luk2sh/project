import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class RangeDto {
	@ApiPropertyOptional()
	@IsOptional()
	@Transform(({ value }) => new Date(value))
	startDate?: Date;

	@ApiPropertyOptional()
	@IsOptional()
	@Transform(({ value }) => new Date(value))
	endDate?: Date;
}

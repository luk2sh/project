import { IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto {
	@ApiProperty({ example: 0, description: 'offset for pagination' })
	@IsNumber()
	@Type(() => Number)
	offset: number;

	@ApiProperty({ example: '10', description: 'limit for pagination' })
	@IsNumber()
	@Type(() => Number)
	limit: number;
}

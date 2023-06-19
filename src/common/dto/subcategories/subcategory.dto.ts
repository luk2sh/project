import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { ImageEnum } from 'src/common';
import { IsEnum } from 'class-validator';

export class SubcategoryDto {
	@ApiProperty({ example: 'Coffee' })
	@Expose()
	name: string;

	@ApiProperty({ example: 'dwrewr242342r23r' })
	@Expose()
	categoryId: string;

	@ApiProperty({ example: ImageEnum.Expense })
	@IsEnum(ImageEnum)
	@Expose()
	image: ImageEnum;
}

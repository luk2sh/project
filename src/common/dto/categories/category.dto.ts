import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { CategoryColorEnum, CategoryTypeEnum, ImageEnum } from 'src/common/enums';
import { Expose } from 'class-transformer';

export class CategoryDto {
	@ApiProperty({ example: 'Shopping' })
	@IsString()
	@Expose()
	name: string;

	@ApiProperty({ example: CategoryTypeEnum.Accounts })
	@IsEnum(CategoryTypeEnum)
	@Expose()
	type: CategoryTypeEnum;

	@Expose()
	@ApiProperty({ example: CategoryColorEnum.Red })
	@Expose()
	@IsEnum(CategoryColorEnum)
	color: CategoryColorEnum;

	@ApiProperty({ example: ImageEnum.Expense })
	@IsEnum(ImageEnum)
	@Expose()
	image: ImageEnum;
}

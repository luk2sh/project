import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Expose, plainToClass, Type } from 'class-transformer';
import { User } from 'src/models';
import { SignInDto } from '../../auth';
import { CategoryResponse } from '../../categories';

export class UserResponse extends SignInDto {
	@ApiProperty({ example: 'string' })
	@Expose()
	@IsString()
	id: string;

	@ApiPropertyOptional({ example: 'string' })
	@IsOptional()
	@Expose()
	@IsString()
	countryId?: string;

	@ApiProperty({ type: CategoryResponse, isArray: true })
	@Expose()
	@Type(() => CategoryResponse)
	@ValidateNested()
	categories: CategoryResponse[];

	@ApiPropertyOptional({ example: 'string' })
	@IsOptional()
	@Expose()
	@IsString()
	currencyId?: string;

	@ApiPropertyOptional({ example: '25000' })
	@IsOptional()
	@Expose()
	@IsNumber()
	total?: number;

	@ApiPropertyOptional({ example: '1234' })
	@IsOptional()
	pincode?: string;

	static mapFrom(user: User): UserResponse {
		return plainToClass(UserResponse, user, {
			excludeExtraneousValues: true,
		});
	}

	static mapFromMulti(users: User[]): UserResponse[] {
		return users.map(UserResponse.mapFrom);
	}
}

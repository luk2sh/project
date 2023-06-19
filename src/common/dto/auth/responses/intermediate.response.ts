import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class IntermediateResponse {
	@ApiProperty({ example: 'lfalsdlasflslf.fasflsdfl.flasfdlsfl' })
	@IsNotEmpty()
	@Expose()
	@IsString()
	intermediateToken: string;

	@ApiProperty({ example: 'true' })
	@IsNotEmpty()
	@Expose()
	@IsBoolean()
	code: boolean;
}

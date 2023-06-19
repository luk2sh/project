import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

class CurrenciesRatesDto {
	[key: string]: number;
}

export class CurrenciesApiResponse {
	@ApiProperty({ example: 'true' })
	@Expose()
	success: boolean;

	@ApiProperty({ example: '123123124' })
	@Expose()
	timestamp: number;

	@ApiProperty({ example: 'USD' })
	@Expose()
	base: string;

	@ApiProperty({ example: 'rates:{AED: 3.6722}' })
	@Expose()
	rates: CurrenciesRatesDto;
}

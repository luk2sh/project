import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToClass } from 'class-transformer';
import { Currency } from 'src/models/currency.model';

export class CurrencyDto {
	@ApiProperty()
	@Expose()
	id: string;

	@ApiProperty()
	@Expose()
	name: string;

	@ApiProperty()
	@Expose()
	symbol: string;

	@ApiProperty()
	@Expose()
	exchangeRate: string;

	@ApiProperty()
	@Expose()
	exchangeRateUpdatedAt: Date;

	static mapFrom(currency: Currency): CurrencyDto {
		return plainToClass(CurrencyDto, currency, {
			excludeExtraneousValues: true,
		});
	}

	static mapFromMulti(currencies: Currency[]): CurrencyDto[] {
		return currencies.map(CurrencyDto.mapFrom);
	}
}

import { Injectable } from '@nestjs/common';
import { Currency } from 'src/models/currency.model';
import { InjectModel } from '@nestjs/sequelize';
import { CurrencyDto } from '../../common';

@Injectable()
export class CurrencyRepository {
	constructor(
		@InjectModel(Currency)
		private readonly currencyModel: typeof Currency
	) {}

	async updateAllCurrencies(newData: Omit<CurrencyDto, string>[]): Promise<void> {
		await this.currencyModel.bulkCreate(newData, {
			fields: ['id', 'name', 'exchangeRate', 'exchangeRateUpdatedAt'],
			updateOnDuplicate: ['exchangeRate', 'exchangeRateUpdatedAt'],
		});
	}

	async getCurrencies(): Promise<Currency[]> {
		return this.currencyModel.findAll();
	}
}

import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { CurrencyDto, LoggerServiceDecorator } from 'src/common';
import { currencyConfig } from 'src/config';
import { CurrencyRepository } from 'src/repository';
import { CurrenciesApiResponse } from 'src/common';
import axios from 'axios';
import { Currency } from 'src/models/currency.model';

@Injectable()
export class CurrencyService {
	private readonly logger = new Logger(CurrencyService.name);
	private readonly url: string;
	private readonly apikey: string;

	constructor(
		private readonly httpService: HttpService,
		private readonly currencyRepository: CurrencyRepository
	) {
		const { url, apikey } = currencyConfig();
		this.url = url;
		this.apikey = apikey;
	}

	@LoggerServiceDecorator()
	async getApiCurrencies(): Promise<CurrenciesApiResponse> {
		try {
			return axios
				.get(this.url, {
					headers: {
						apikey: `${this.apikey}`,
					},
				})
				.then(response => response.data);
		} catch (e) {
			throw new Error(e);
		}
	}

	@LoggerServiceDecorator()
	async getCurrenciesExchangeRates(count = 0): Promise<CurrencyDto[]> {
		try {
			const data = await this.getApiCurrencies();
			const currencies = await this.currencyRepository.getCurrencies();
			return Object.entries(data.rates).reduce((acc, [key, value]) => {
				const foundObject = currencies.find(currency => currency.id === key);
				if (foundObject) {
					acc.push({
						...CurrencyDto.mapFrom(foundObject),
						id: key,
						exchangeRate: value,
						exchangeRateUpdatedAt: new Date(),
					});
				}
				return acc;
			}, []);
		} catch (error) {
			if (count <= 10) {
				setTimeout(() => {
					this.getCurrenciesExchangeRates(count++);
				}, 5 * 60 * 1000);
			}
			this.logger.warn(error);
		}
	}

	@LoggerServiceDecorator()
	async updateAllCurrencies(): Promise<void> {
		const result = await this.getCurrenciesExchangeRates().then(
			CurrencyDto.mapFromMulti
		);
		await this.currencyRepository.updateAllCurrencies(result);
	}

	@LoggerServiceDecorator()
	async getCurrencies(): Promise<Currency[]> {
		return this.currencyRepository.getCurrencies();
	}
}

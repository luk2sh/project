import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { LoggerServiceDecorator } from 'src/common';
import { CurrencyService } from '../../currency/services/currency.service';

@Injectable()
export class CronService {
	private readonly logger = new Logger(CronService.name);
	constructor(private readonly currencyService: CurrencyService) {}

	@Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
	@LoggerServiceDecorator()
	async getAllCurrency(): Promise<void> {
		await this.currencyService.updateAllCurrencies();
	}
}

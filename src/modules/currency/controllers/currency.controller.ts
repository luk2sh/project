import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CurrencyDto, LoggerApi } from 'src/common';
import { CurrencyService } from '../services/currency.service';

@Controller('currency')
@ApiTags('currency')
@LoggerApi()
@ApiBearerAuth()
export class CurrencyController {
	constructor(private readonly currencyService: CurrencyService) {}

	@Get()
	@ApiOperation({ summary: '[GetCurrencies]', description: 'Get currencies' })
	@ApiResponse({ type: CurrencyDto, isArray: true })
	@HttpCode(HttpStatus.OK)
	async getCurrencies(): Promise<CurrencyDto[]> {
		return this.currencyService.getCurrencies().then(CurrencyDto.mapFromMulti);
	}
}

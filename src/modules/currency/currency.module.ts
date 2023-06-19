import { Module } from '@nestjs/common';
import { RepositoryModule } from 'src/repository';
import { CurrencyController } from './controllers/currency.controller';
import { CurrencyService } from './services/currency.service';
import { HttpModule } from '@nestjs/axios';

const providers = [CurrencyService];
@Module({
	imports: [HttpModule, RepositoryModule],
	controllers: [CurrencyController],
	providers,
	exports: [...providers],
})
export class CurrencyModule {}

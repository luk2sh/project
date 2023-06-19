import { Module } from '@nestjs/common';
import { RepositoryModule } from 'src/repository';
import { TransactionController } from './controllers/transaction.controller';
import { TransactionService } from './services/transaction.service';

const providers = [TransactionService];
@Module({
	imports: [RepositoryModule],
	controllers: [TransactionController],
	providers,
	exports: [...providers],
})
export class TransactionModule {}

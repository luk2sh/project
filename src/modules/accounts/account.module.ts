import { Module } from '@nestjs/common';
import { AccountService } from './services/account.service';
import { RepositoryModule } from 'src/repository';
import { AccountController } from './controllers/account.controller';

const providers = [AccountService];
@Module({
	imports: [RepositoryModule],
	controllers: [AccountController],
	providers,
	exports: [...providers],
})
export class AccountModule {}

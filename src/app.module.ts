import { Module } from '@nestjs/common';
import { DatabaseModule } from './common/database';
import { UsersModule } from './modules/users/users.module';
import { AppConfigModule } from './config';
import { AuthModule } from './modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from 'src/common';
import { MailModule } from './modules/mail/mail.module';
import { CategoryModule } from './modules/categories/category.module';
import { CurrencyModule } from './modules/currency/currency.module';
import { ScheduleModule } from '@nestjs/schedule';
import { HttpModule } from '@nestjs/axios';
import { RepositoryModule } from './repository';
import { AccountModule } from './modules/accounts/account.module';
import { TransactionModule } from './modules/transactions/transaction.module';

@Module({
	imports: [
		AuthModule,
		AppConfigModule,
		DatabaseModule,
		UsersModule,
		MailModule,
		CategoryModule,
		CurrencyModule,
		ScheduleModule.forRoot(),
		HttpModule,
		RepositoryModule,
		AccountModule,
		TransactionModule,
	],
	controllers: [],
	providers: [{ provide: APP_GUARD, useClass: AtGuard }],
})
export class AppModule {}

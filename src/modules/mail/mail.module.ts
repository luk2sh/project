import { Global, Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailService } from './services/mail.service';
import { ConfigService } from '@nestjs/config';
import { getMailer } from 'src/config';
import { MailController } from './controllers/mail.controller';
import { CronService } from './services/cron.service';
import { CurrencyModule } from '../currency/currency.module';

const { getMailerHost, getMailerPort, getEmail, getSupport, getPassword } = getMailer();
const providers = [MailService, CronService, ConfigService];
@Global()
@Module({
	imports: [
		MailerModule.forRootAsync({
			useFactory: () => ({
				transport: {
					host: getMailerHost,
					port: getMailerPort,
					auth: {
						user: getEmail,
						pass: getPassword,
					},
				},
				defaults: {
					from: `${getSupport} ${getEmail}`,
				},
				template: {
					adapter: new HandlebarsAdapter(),
					options: {
						strict: true,
					},
				},
			}),
		}),
		CurrencyModule,
	],
	controllers: [MailController],
	providers: [...providers],
	exports: [...providers],
})
export class MailModule {}

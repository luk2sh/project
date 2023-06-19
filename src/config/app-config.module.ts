import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { sequelizeConfig } from './';

@Module({
	imports: [
		ConfigModule.forRoot({
			load: [sequelizeConfig],
		}),
	],
})
export class AppConfigModule {}

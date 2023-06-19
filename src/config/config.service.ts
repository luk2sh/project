import { get } from 'env-var';
import { SequelizeModuleOptions } from '@nestjs/sequelize';

export const getPort = () => get('PORT').asPortNumber();

export const getClientUrl = () => get('CLIENT_URL').asString();

export const getPostgresUrl = () => get('POSTGRES_URL').asString();

export const currencyConfig = () => ({
	url: get('CURRENCY_BASE_URL').asString(),
	apikey: get('CURRENCY_BASE_APIKEY').asString(),
});

export const sequelizeConfig = (): SequelizeModuleOptions => ({
	port: get('DB_PORT').required().asPortNumber(),
	dialect: 'postgres',
	host: get('DB_HOST').required().asString(),
	username: get('DB_USERNAME').required().asString(),
	password: get('DB_PASSWORD').required().asString(),
	database: get('DB_DATABASE').required().asString(),
	autoLoadModels: true,
	synchronize: false,
	logging: false,
	models: [__dirname + '../**/*.model.ts'],
	dialectOptions: {},
});

export const getAuthConfig = () => ({
	atSecret: get('AT_SECRET_KEY').required().asString(),
	atSecretExpires: get('AT_SECRET_EXPIRES').required().asString(),
	rtSecret: get('RT_SECRET_KEY').required().asString(),
	rtSecretExpires: get('RT_SECRET_EXPIRES').required().asString(),
	intermediateSecret: get('INTERMEDIATE_SECRET').required().asString(),
	intermediateSecretExpires: get('INTERMEDIATE_SECRET_EXPIRES').required().asString(),
});

export const getMailer = () => ({
	getMailerHost: get('GOOGLE_MAILER_HOST').asString(),
	getMailerPort: get('GOOGLE_MAILER_PORT').asPortNumber(),
	getEmail: get('GOOGLE_EMAIL').asString(),
	getSupport: get('GOOGLE_SUPPORT').asString(),
	getPassword: get('GOOGLE_MAILER_PASSWORD').asString(),
});

export const getGoogleAudience = () => get('AUTH_GOOGLE_AUDIENCE').asString();

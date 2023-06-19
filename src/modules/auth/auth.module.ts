import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { RepositoryModule } from 'src/repository';
import { UsersModule } from '../users/users.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/services/users.service';
import { PassportModule } from '@nestjs/passport';
import { AtStrategy } from './strategies/at.strategy';
import { RtStrategy } from './strategies/rt.strategy';
import { IntermediateStrategy } from './strategies/intermediate.strategy';
import { CategoryModule } from '../categories/category.module';
import { SubcategoriesModule } from '../subcategories/subcategories.module';

const providers = [
	AuthService,
	JwtService,
	UsersService,
	AtStrategy,
	RtStrategy,
	IntermediateStrategy,
];
@Module({
	imports: [
		JwtModule.register({}),
		RepositoryModule,
		UsersModule,
		PassportModule,
		CategoryModule,
		SubcategoriesModule,
	],
	controllers: [AuthController],
	providers,
	exports: [...providers],
})
export class AuthModule {}

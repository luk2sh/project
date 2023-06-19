import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { RepositoryModule } from 'src/repository';
import { CategoryModule } from '../categories/category.module';
import { CategoryService } from '../categories/services/category.service';

const providers = [UsersService, CategoryService];
@Module({
	imports: [RepositoryModule, CategoryModule],
	controllers: [UsersController],
	providers,
	exports: [...providers],
})
export class UsersModule {}

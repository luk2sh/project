import { Module } from '@nestjs/common';
import { CategoryController } from './controllers/category.controller';
import { CategoryService } from './services/category.service';
import { RepositoryModule } from 'src/repository';

const providers = [CategoryService];
@Module({
	imports: [RepositoryModule],
	controllers: [CategoryController],
	providers,
	exports: [...providers],
})
export class CategoryModule {}

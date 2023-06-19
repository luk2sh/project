import { Module } from '@nestjs/common';
import { SubcategoriesController } from './controllers/subcategories.controller';
import { SubcategoriesService } from './services/subcategories.service';
import { RepositoryModule } from 'src/repository';

const providers = [SubcategoriesService];
@Module({
	imports: [RepositoryModule],
	controllers: [SubcategoriesController],
	providers,
	exports: [...providers],
})
export class SubcategoriesModule {}

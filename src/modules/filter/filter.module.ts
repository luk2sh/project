import { Module } from '@nestjs/common';
import { RepositoryModule } from 'src/repository';

@Module({
	imports: [RepositoryModule],
	controllers: [],
})
export class FilterModule {}

import { Subcategory } from 'src/models';
import { SubcategoryRepository } from 'src/repository';
import {
	LoggerServiceDecorator,
	UpdateSubcategoryRequest,
	SubcategoryDto,
} from 'src/common';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class SubcategoriesService {
	private readonly logger = new Logger(SubcategoryRepository.name);
	constructor(private readonly subcategoryRepository: SubcategoryRepository) {}

	@LoggerServiceDecorator()
	async createSubcategory(dto: SubcategoryDto): Promise<Subcategory> {
		return this.subcategoryRepository.createSubcategory(dto);
	}

	@LoggerServiceDecorator()
	async getSubcategoryById(id: string): Promise<Subcategory> {
		return this.subcategoryRepository.getSubcategoryById(id);
	}

	@LoggerServiceDecorator()
	async updateSubcategory(
		dto: UpdateSubcategoryRequest,
		id: string
	): Promise<Subcategory> {
		await this.subcategoryRepository.updateSubcategory(dto, id);
		return this.subcategoryRepository.getSubcategoryById(id);
	}

	@LoggerServiceDecorator()
	async deleteSubcategory(id: string): Promise<void> {
		await this.subcategoryRepository.deleteSubcategory(id);
	}
}

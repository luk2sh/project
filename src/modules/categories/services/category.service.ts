import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CategoryRepository } from 'src/repository';
import {
	CategoryResponse,
	CategoryExist,
	defaultCategories,
	CreateCategoryRequest,
	LoggerServiceDecorator,
	UpdateCategoryRequest,
} from 'src/common';
import { v4 as uuidv4 } from 'uuid';
import { Category } from 'src/models';

@Injectable()
export class CategoryService {
	private readonly logger = new Logger(CategoryService.name);
	constructor(private readonly categoryRepository: CategoryRepository) {}

	@LoggerServiceDecorator()
	async create(dto: CreateCategoryRequest): Promise<CategoryResponse> {
		const category = await this.categoryRepository.getCategoryByName(
			dto.name,
			dto.userId
		);
		if (category) {
			throw new BadRequestException(CategoryExist);
		}
		return this.categoryRepository.create(dto).then(CategoryResponse.mapFrom);
	}

	@LoggerServiceDecorator()
	async getAllCategory(userId: string): Promise<CategoryResponse[]> {
		return this.categoryRepository
			.getAllCategory(userId)
			.then(CategoryResponse.mapFromMulti);
	}

	@LoggerServiceDecorator()
	async getCategoryById(userId: string, id: string): Promise<CategoryResponse> {
		return this.categoryRepository
			.getCategoryById(userId, id)
			.then(CategoryResponse.mapFrom);
	}

	@LoggerServiceDecorator()
	async updateCategory(
		userId: string,
		dto: UpdateCategoryRequest,
		id: string
	): Promise<CategoryResponse> {
		return this.categoryRepository
			.updateCategory(userId, dto, id)
			.then(CategoryResponse.mapFrom);
	}

	@LoggerServiceDecorator()
	async deleteCategoryById(userId: string, id: string): Promise<void> {
		await this.categoryRepository.deleteCategoryById(userId, id);
	}

	@LoggerServiceDecorator()
	async addBasicCategory(userId: string): Promise<Category[]> {
		const categories: CreateCategoryRequest[] = defaultCategories.map(category => ({
			...category,
			userId,
			id: uuidv4(),
		}));
		return this.categoryRepository.addBasicCategory(categories);
	}
}

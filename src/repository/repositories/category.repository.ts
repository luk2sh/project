import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Category, Subcategory } from 'src/models';
import {
	CategoryNotExist,
	CreateCategoryRequest,
	UpdateCategoryRequest,
} from 'src/common';

@Injectable()
export class CategoryRepository {
	constructor(
		@InjectModel(Category)
		private categoryModel: typeof Category
	) {}

	async create(dto: CreateCategoryRequest): Promise<Category> {
		try {
			return this.categoryModel.create({ ...dto });
		} catch (error) {
			throw new Error(error);
		}
	}

	async getAllCategory(userId: string): Promise<Category[]> {
		return this.categoryModel.findAll({ where: { userId } });
	}

	async getCategoryById(userId: string, id: string): Promise<Category> {
		const category = await this.categoryModel.findOne({
			where: { userId, id },
			include: [Subcategory],
		});

		if (!category) {
			throw new NotFoundException(CategoryNotExist);
		}
		return category;
	}
	async getCategoryByName(name: string, userId: string): Promise<Category> {
		return this.categoryModel.findOne({
			where: { userId, name },
			include: [Subcategory],
		});
	}

	async updateCategory(
		userId: string,
		dto: UpdateCategoryRequest,
		id: string
	): Promise<Category> {
		const [, [updatedCategory]] = await this.categoryModel.update(dto, {
			where: { userId, id },
			returning: true,
		});

		if (!updatedCategory) {
			throw new NotFoundException(CategoryNotExist);
		}

		return updatedCategory;
	}

	async deleteCategoryById(userId: string, id: string): Promise<void> {
		await this.categoryModel.destroy({ where: { id, userId } });
	}

	async addBasicCategory(
		dto: readonly Omit<CreateCategoryRequest, string>[]
	): Promise<Category[]> {
		return this.categoryModel.bulkCreate(dto);
	}
}

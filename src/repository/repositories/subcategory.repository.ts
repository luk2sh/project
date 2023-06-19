import { Subcategory } from 'src/models';
import { InjectModel } from '@nestjs/sequelize';
import { Injectable, NotFoundException } from '@nestjs/common';
import {
	SubcategoryDto,
	SubcategoryNotExist,
	UpdateSubcategoryRequest,
} from 'src/common';

@Injectable()
export class SubcategoryRepository {
	constructor(
		@InjectModel(Subcategory)
		private subcategoryModel: typeof Subcategory
	) {}

	async createSubcategory(dto: SubcategoryDto): Promise<Subcategory> {
		try {
			return this.subcategoryModel.create({ ...dto });
		} catch (error) {
			throw new Error(error);
		}
	}

	async getSubcategoryById(id: string): Promise<Subcategory> {
		const subcategory = await this.subcategoryModel.findByPk(id);
		if (!subcategory) {
			throw new NotFoundException(SubcategoryNotExist);
		}
		return subcategory;
	}

	async updateSubcategory(
		dto: UpdateSubcategoryRequest,
		id: string
	): Promise<Subcategory> {
		const [, [updatedSubcategory]] = await this.subcategoryModel.update(dto, {
			where: { id },
			returning: true,
		});

		if (!updatedSubcategory) {
			throw new NotFoundException(SubcategoryNotExist);
		}

		return updatedSubcategory;
	}

	async deleteSubcategory(id: string): Promise<void> {
		await this.subcategoryModel.destroy({ where: { id } });
	}
}

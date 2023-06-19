import {
	BeforeCreate,
	BelongsTo,
	Column,
	ForeignKey,
	IsUUID,
	Model,
	PrimaryKey,
	Table,
} from 'sequelize-typescript';
import { IsNumber, IsOptional } from 'class-validator';
import { Category } from './category.model';
import { Subcategory } from './subcategory.model';
import { Account } from './account.model';
import { v4 as uuidv4 } from 'uuid';

@Table
export class Transaction extends Model {
	@IsUUID(4)
	@PrimaryKey
	@Column
	id: string;

	@IsNumber()
	@Column
	amount: number;

	@BelongsTo(() => Category)
	category: Category;

	@ForeignKey(() => Category)
	@Column
	categoryId: string;

	@BelongsTo(() => Subcategory)
	subcategory: Subcategory;

	@ForeignKey(() => Subcategory)
	@IsOptional()
	@Column
	subCategoryId: string;

	@BelongsTo(() => Account)
	account: Account;

	@ForeignKey(() => Account)
	@Column
	accountId: string;

	@BeforeCreate
	static addUuidId(instance: Transaction) {
		instance.id = uuidv4();
	}
}

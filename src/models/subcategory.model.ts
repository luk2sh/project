import {
	BeforeCreate,
	BelongsTo,
	BelongsToMany,
	Column,
	ForeignKey,
	HasMany,
	IsUUID,
	Model,
	PrimaryKey,
	Table,
} from 'sequelize-typescript';
import { IsString } from 'class-validator';
import { Category } from './category.model';
import { v4 as uuidv4 } from 'uuid';
import { Transaction } from './transaction.model';
import { BudgetSubcategory } from './budgetSubcategories.model';
import { Budget } from './budget.model';

@Table
export class Subcategory extends Model {
	@PrimaryKey
	@IsUUID(4)
	@Column
	id: string;

	@IsString()
	@Column
	name: string;

	@IsString()
	@Column
	image: string;

	@BelongsTo(() => Category)
	category: Category;

	@ForeignKey(() => Category)
	@Column
	categoryId: string;

	@HasMany(() => Transaction)
	transaction: Transaction[];

	@BelongsToMany(() => Budget, () => BudgetSubcategory)
	budget: BudgetSubcategory;

	@BeforeCreate
	static addUuidId(instance: Subcategory) {
		instance.id = uuidv4();
	}
}

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
	Unique,
} from 'sequelize-typescript';
import { IsString } from 'class-validator';
import { User } from './user.model';
import { v4 as uuidv4 } from 'uuid';
import { Subcategory } from './subcategory.model';
import { Transaction } from './transaction.model';
import { Budget } from './budget.model';
import { BudgetCategory } from './budgetCategories.model';

@Table({ timestamps: false })
export class Category extends Model {
	@IsUUID(4)
	@PrimaryKey
	@Column
	id: string;

	@IsString()
	@Unique
	@Column
	name: string;

	@IsString()
	@Column
	type: string;

	@Column
	@IsString()
	color: string;

	@Column
	@IsString()
	image: string;

	@BelongsTo(() => User)
	user: User;

	@ForeignKey(() => User)
	@Column
	userId: string;

	@HasMany(() => Subcategory)
	subcategories: Subcategory[];

	@HasMany(() => Transaction)
	transactions: Transaction[];

	@BelongsToMany(() => Budget, () => BudgetCategory)
	budgets: Budget[];

	@BeforeCreate
	static addUuidId(instance: Category) {
		instance.id = uuidv4();
	}
}

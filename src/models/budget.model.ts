import {
	BeforeCreate,
	BelongsTo,
	BelongsToMany,
	Column,
	ForeignKey,
	IsDate,
	IsUUID,
	Model,
	PrimaryKey,
	Table,
} from 'sequelize-typescript';
import { IsNumber, IsString } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';
import { User } from './user.model';
import { Currency } from './currency.model';
import { BudgetAccount } from './budgetAccount.model';
import { Account } from './account.model';
import { Category } from './category.model';
import { BudgetCategory } from './budgetCategories.model';
import { BudgetSubcategory } from './budgetSubcategories.model';
import { Subcategory } from './subcategory.model';

@Table({ timestamps: false })
export class Budget extends Model {
	@PrimaryKey
	@IsUUID(4)
	@Column
	id: string;

	@IsString()
	@Column
	name: string;

	@IsNumber()
	@Column
	amount: number;

	@IsDate
	@Column
	startDate: Date;

	@IsDate
	@Column
	endDate: Date;

	@BelongsTo(() => User)
	user: User;

	@ForeignKey(() => User)
	userId: string;

	@BelongsTo(() => Currency)
	currency: Currency;

	@ForeignKey(() => Currency)
	currencyId: string;

	@BelongsToMany(() => Account, () => BudgetAccount)
	accounts: Account[];

	@BelongsToMany(() => Category, () => BudgetCategory)
	categories: Category[];

	@BelongsToMany(() => Subcategory, () => BudgetSubcategory)
	subcategories: Subcategory[];

	@BeforeCreate
	static addUuidId(instance: Budget) {
		instance.id = uuidv4();
	}
}

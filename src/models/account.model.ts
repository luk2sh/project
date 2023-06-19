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
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Transaction } from './transaction.model';
import { User } from './user.model';
import { v4 as uuidv4 } from 'uuid';
import { Currency } from './currency.model';
import { BudgetAccount } from './budgetAccount.model';
import { Budget } from './budget.model';
import { UserAccount } from './userAccount.model';

@Table({ timestamps: false })
export class Account extends Model {
	@IsUUID(4)
	@PrimaryKey
	@Column
	id: string;

	@IsString()
	@Column
	name: string;

	@IsString()
	@IsOptional()
	@Column
	description: string;

	@Column
	@IsString()
	type: string;

	@IsString()
	@Column
	cardNumber: string;

	@IsNumber()
	@Column
	balance: number;

	@HasMany(() => Transaction)
	transactions: Transaction[];

	@BelongsToMany(() => User, () => UserAccount)
	users: User[];

	@BelongsTo(() => Currency)
	currency: Currency;

	@ForeignKey(() => Currency)
	currencyId: string;

	@BelongsToMany(() => Budget, () => BudgetAccount)
	budgets: Budget[];

	@BeforeCreate
	static addUuidId(instance: Account) {
		instance.id = uuidv4();
	}
}

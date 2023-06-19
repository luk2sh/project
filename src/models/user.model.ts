import {
	AllowNull,
	Column,
	IsUUID,
	PrimaryKey,
	Table,
	Model,
	Unique,
	Default,
	BeforeCreate,
	HasMany,
	DataType,
	ForeignKey,
	BelongsTo,
	BelongsToMany,
} from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';
import { IsNumber, IsString } from 'class-validator';
import { Category } from './category.model';
import { Account } from './account.model';
import { Budget } from './budget.model';
import { Debt } from './debt.model';
import { Goal } from './goal.model';
import { Country } from './country.model';
import { UserAccount } from './userAccount.model';

@Table
export class User extends Model {
	@IsUUID(4)
	@PrimaryKey
	@Column
	id: string;

	@Column({
		type: DataType.INTEGER,
		allowNull: false,
		autoIncrement: true,
	})
	@IsNumber()
	accountId: number;

	@AllowNull(false)
	@Unique(true)
	@Column
	email: string;

	@AllowNull(false)
	@Column
	password: string;

	@IsString()
	@Column
	pincode: string;

	@BelongsTo(() => Country)
	country: Country;

	@ForeignKey(() => Country)
	countryId: string;

	@IsString()
	@Column
	currency: string;

	@AllowNull(false)
	@Default(0)
	@Column
	balance: number;

	@Column
	@IsString()
	refreshToken: string;

	@Column
	@IsString()
	intermediateToken: string;

	@HasMany(() => Category)
	categories: Category[];

	@BelongsToMany(() => Account, () => UserAccount)
	accounts: Account[];

	@HasMany(() => Budget)
	budget: Budget[];

	@HasMany(() => Debt)
	debt: Debt[];

	@HasMany(() => Goal)
	goal: Goal[];

	@BeforeCreate
	static addUuidId(instance: User) {
		instance.id = uuidv4();
	}
}

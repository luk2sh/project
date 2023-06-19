import {
	BeforeCreate,
	BelongsTo,
	Column,
	ForeignKey,
	IsDate,
	IsUUID,
	Model,
	PrimaryKey,
	Table,
} from 'sequelize-typescript';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';
import { Currency } from './currency.model';
import { User } from './user.model';

@Table({ timestamps: false })
export class Debt extends Model {
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

	@IsString()
	@Column
	@IsOptional()
	status: string;

	@IsBoolean()
	@Column
	completed: boolean;

	@IsDate
	@Column
	endDate: Date;

	@BelongsTo(() => Currency)
	currency: Currency;

	@ForeignKey(() => Currency)
	currencyId: string;

	@BelongsTo(() => User, 'borrowedId')
	borrowedUser: User;

	@ForeignKey(() => User)
	@IsOptional()
	@Column
	borrowedId: string;

	@BelongsTo(() => User, 'lentId')
	lentUser: User;

	@ForeignKey(() => User)
	@IsOptional()
	@Column
	lentId: string;

	@BelongsTo(() => User, 'createdId')
	createdUser: User;

	@ForeignKey(() => User)
	createdId: string;

	@BeforeCreate
	static addUuidId(instance: Debt) {
		instance.id = uuidv4();
	}
}

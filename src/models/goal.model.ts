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
import { v4 as uuidv4 } from 'uuid';
import { IsNumber, IsString } from 'class-validator';
import { User } from './user.model';
import { Currency } from './currency.model';

@Table({ timestamps: false })
export class Goal extends Model {
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

	@IsNumber()
	@Column
	balance: number;

	@IsDate
	@Column
	endDate: Date;

	@BelongsTo(() => User)
	user: User;

	@ForeignKey(() => User)
	@Column
	userId: string;

	@BelongsTo(() => Currency)
	currency: Currency;

	@ForeignKey(() => Currency)
	@Column
	currencyId: string;

	@BeforeCreate
	static addUuidId(instance: Goal) {
		instance.id = uuidv4();
	}
}

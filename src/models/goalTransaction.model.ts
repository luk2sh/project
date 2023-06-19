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
import { v4 as uuidv4 } from 'uuid';
import { IsNumber, IsString } from 'class-validator';
import { Currency } from './currency.model';
import { Goal } from './goal.model';

@Table({ updatedAt: false })
export class GoalTransaction extends Model {
	@PrimaryKey
	@IsUUID(4)
	@Column
	id: string;

	@BelongsTo(() => Goal)
	goal: Goal;

	@ForeignKey(() => Goal)
	@IsString()
	@Column
	goalId: string;

	@IsNumber()
	@Column
	amount: number;

	@BelongsTo(() => Currency)
	currency: Currency;

	@ForeignKey(() => Currency)
	@IsString()
	@Column
	currencyId: string;

	@BeforeCreate
	static addUuidId(instance: GoalTransaction) {
		instance.id = uuidv4();
	}
}

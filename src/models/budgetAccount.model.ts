import {
	BeforeCreate,
	Column,
	ForeignKey,
	IsUUID,
	Model,
	PrimaryKey,
	Table,
} from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';
import { IsString } from 'class-validator';
import { Budget } from './budget.model';
import { Account } from './account.model';

@Table({ timestamps: false })
export class BudgetAccount extends Model {
	@PrimaryKey
	@IsUUID(4)
	@Column
	id: string;

	@ForeignKey(() => Budget)
	@IsString()
	@Column
	budgetId: string;

	@ForeignKey(() => Account)
	@IsString()
	@Column
	accountId: string;

	@BeforeCreate
	static addUuidId(instance: BudgetAccount) {
		instance.id = uuidv4();
	}
}

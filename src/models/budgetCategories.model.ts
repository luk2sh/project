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
import { Category } from './category.model';

@Table({ timestamps: false })
export class BudgetCategory extends Model {
	@PrimaryKey
	@IsUUID(4)
	@Column
	id: string;

	@ForeignKey(() => Budget)
	@IsString()
	@Column
	budgetId: string;

	@ForeignKey(() => Category)
	@IsString()
	@Column
	categoryId: string;

	@BeforeCreate
	static addUuidId(instance: BudgetCategory) {
		instance.id = uuidv4();
	}
}

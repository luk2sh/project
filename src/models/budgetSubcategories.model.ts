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
import { Budget } from './budget.model';
import { IsString } from 'class-validator';
import { Subcategory } from './subcategory.model';

@Table({ timestamps: false })
export class BudgetSubcategory extends Model {
	@PrimaryKey
	@IsUUID(4)
	@Column
	id: string;

	@ForeignKey(() => Budget)
	@IsString()
	@Column
	budgetId: string;

	@ForeignKey(() => Subcategory)
	@IsString()
	@Column
	subcategoryId: string;

	@BeforeCreate
	static addUuidId(instance: BudgetSubcategory) {
		instance.id = uuidv4();
	}
}

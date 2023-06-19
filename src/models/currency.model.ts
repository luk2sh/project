import { Column, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Budget } from './budget.model';
import { Debt } from './debt.model';
import { Goal } from './goal.model';
import { GoalTransaction } from './goalTransaction.model';
import { Country } from './country.model';

@Table({ timestamps: false })
export class Currency extends Model {
	@PrimaryKey
	@IsString()
	@Column
	id: string;

	@IsString()
	@Column
	name: string;

	@HasMany(() => Country)
	country: Country[];

	@IsNumber()
	@IsOptional()
	@Column
	symbol: string;

	@IsString()
	@Column
	exchangeRate: string;

	@Column
	exchangeRateUpdatedAt: Date;

	@HasMany(() => Budget)
	budget: Budget[];

	@HasMany(() => Debt)
	debt: Debt[];

	@HasMany(() => Goal)
	goal: Goal[];

	@HasMany(() => GoalTransaction)
	goalTransaction: GoalTransaction[];
}

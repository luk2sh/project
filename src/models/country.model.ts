import {
	BelongsTo,
	Column,
	ForeignKey,
	HasMany,
	Model,
	PrimaryKey,
	Table,
} from 'sequelize-typescript';
import { IsString } from 'class-validator';
import { Currency } from './currency.model';
import { User } from './user.model';

@Table({ timestamps: false })
export class Country extends Model {
	@PrimaryKey
	@IsString()
	@Column
	id: string;

	@IsString()
	@Column
	name: string;

	@BelongsTo(() => Currency)
	currency: Currency;

	@ForeignKey(() => Currency)
	currencyId: string;

	@HasMany(() => User)
	user: User[];
}

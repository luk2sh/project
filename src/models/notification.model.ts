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
import { IsBoolean, IsOptional } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';
import { User } from './user.model';
import { Debt } from './debt.model';

@Table
export class Notification extends Model {
	@PrimaryKey
	@IsUUID(4)
	@Column
	id: string;

	@IsBoolean()
	@Column
	active: boolean;

	@IsBoolean()
	@Column
	type: boolean;

	@BelongsTo(() => User, 'userId')
	user: User;

	@ForeignKey(() => User)
	userId: string;

	@BelongsTo(() => User, 'receiverId')
	receiverUser: User;

	@ForeignKey(() => User)
	@Column
	receiverId: string;

	@BelongsTo(() => Debt)
	debt: Debt;

	@ForeignKey(() => Debt)
	@IsOptional()
	@Column
	debtId: string;

	@BeforeCreate
	static addUuidId(instance: Notification) {
		instance.id = uuidv4();
	}
}

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
import { Account } from './account.model';
import { User } from './user.model';
import { IsString } from 'class-validator';

@Table({ timestamps: false })
export class UserAccount extends Model {
	@IsUUID(4)
	@PrimaryKey
	@Column
	id: string;

	@ForeignKey(() => Account)
	@Column
	@IsString()
	accountId: string;

	@ForeignKey(() => User)
	@Column
	@IsString()
	userId: string;

	@BeforeCreate
	static addUuidId(instance: UserAccount) {
		instance.id = uuidv4();
	}
}

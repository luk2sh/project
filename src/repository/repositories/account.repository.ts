import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Account, Transaction, User, UserAccount } from 'src/models';
import { AccountDto, CreateAccountRequest, CreateUserAccount } from 'src/common';

@Injectable()
export class AccountRepository {
	constructor(
		@InjectModel(Account) private readonly accountModel: typeof Account,
		@InjectModel(UserAccount) private readonly usersAccountModel: typeof UserAccount
	) {}

	async addAccount(account: CreateAccountRequest): Promise<Account> {
		return this.accountModel.create({ ...account });
	}

	async createUserAccount(data: CreateUserAccount): Promise<UserAccount> {
		return this.usersAccountModel.create({ ...data });
	}

	async findByCardNumber(cardNumber: string): Promise<Account> {
		return this.accountModel.findOne({ where: { cardNumber } });
	}

	async getUserAccount(accountId: string, userId: string): Promise<Account> {
		return this.accountModel.findOne({
			where: { id: accountId },
			include: [{ model: User, where: { id: userId } }],
		});
	}

	async getAccountUsers(id: string): Promise<Account> {
		return this.accountModel.findOne({
			where: { id },
			include: User,
		});
	}

	async getUserAccounts(id: string): Promise<Account[]> {
		return this.accountModel.findAll({
			include: [{ model: Transaction }, { model: User, where: { id } }],
		});
	}

	async getById(id: string, userId: string): Promise<Account> {
		return this.accountModel.findByPk(id, {
			include: [
				{
					model: User,
					required: true,
					where: {
						id: userId,
					},
				},
				Transaction,
			],
		});
	}

	async update(data: AccountDto, id: string) {
		const [, [updatedAccount]] = await this.accountModel.update(
			{ ...data },
			{
				where: { id },
				returning: true,
			}
		);

		return updatedAccount;
	}

	async removeAccountForUser(userId: string, accountId: string): Promise<void> {
		await this.usersAccountModel.destroy({ where: { accountId, userId } });
	}

	async removeAccount(id: string): Promise<void> {
		await this.accountModel.destroy({ where: { id } });
	}
}

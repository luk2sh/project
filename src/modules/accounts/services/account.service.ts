import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { AccountRepository, TransactionRepository } from 'src/repository';
import {
	AccountDto,
	AccountNotExistForThisUser,
	AccountResponse,
	AccountTypeEnum,
	accountWithTypeCardAndWithoutUser,
	accountWithTypeCardWithUsers,
	accountWithTypeCash,
	BalanceDto,
	CardNumberIsRequired,
	CreateAccountRequest,
	LoggerServiceDecorator,
	TransactionResponse,
	UserExistForThisAccount,
} from 'src/common';
import { Account } from 'src/models';

@Injectable()
export class AccountService {
	private readonly logger = new Logger(AccountService.name);

	constructor(
		private readonly accountRepository: AccountRepository,
		private readonly transactionRepository: TransactionRepository
	) {}

	@LoggerServiceDecorator()
	async addAccount(userId: string, accountDto: CreateAccountRequest): Promise<Account> {
		if (accountDto.type === AccountTypeEnum.Card) {
			if (!accountDto.cardNumber) {
				throw new BadRequestException(CardNumberIsRequired);
			}
			return this.addCard(userId, accountDto);
		} else {
			const account = await this.accountRepository.addAccount(accountDto);
			await this.accountRepository.createUserAccount({
				accountId: account.id,
				userId,
			});
			return account;
		}
	}

	@LoggerServiceDecorator()
	async addCard(userId: string, accountDto: CreateAccountRequest): Promise<Account> {
		let account = await this.accountRepository.findByCardNumber(
			accountDto.cardNumber
		);

		if (account) {
			const accountExistInUser = await this.accountRepository.getUserAccount(
				account.id,
				userId
			);
			if (accountExistInUser) {
				throw new BadRequestException(UserExistForThisAccount);
			}
		}

		if (!account) {
			account = await this.accountRepository.addAccount(accountDto);
		}
		await this.accountRepository.createUserAccount({ accountId: account.id, userId });

		return account;
	}

	@LoggerServiceDecorator()
	async getById(id: string, userId: string): Promise<AccountResponse> {
		const account = await this.accountRepository
			.getById(id, userId)
			.then(AccountResponse.mapFrom);

		const balance = this.calculationAmountOfTransaction(account.transactions);
		return {
			...account,
			...balance,
		};
	}

	@LoggerServiceDecorator()
	async getUserAccounts(id: string): Promise<AccountResponse[]> {
		const accounts = await this.accountRepository
			.getUserAccounts(id)
			.then(AccountResponse.mapFromMulti);

		const accountWithBalance = Promise.all(
			accounts.map(async account => {
				const balance = this.calculationAmountOfTransaction(account.transactions);
				return {
					...account,
					...balance,
				};
			})
		);

		return accountWithBalance;
	}

	@LoggerServiceDecorator()
	calculationAmountOfTransaction(transactions: TransactionResponse[]): BalanceDto {
		return transactions.reduce(
			(acc, transaction) => {
				if (transaction.amount < 0) {
					acc.expense += transaction.amount;
				}
				if (transaction.amount > 0) {
					acc.income += transaction.amount;
				}
				return acc;
			},
			{ income: 0, expense: 0 }
		);
	}

	@LoggerServiceDecorator()
	async update(date: AccountDto, id: string): Promise<Account> {
		return this.accountRepository.update(date, id);
	}

	@LoggerServiceDecorator()
	async removeAccountForUser(userId: string, id: string): Promise<void> {
		const account = await this.accountRepository.getAccountUsers(id);

		const accountNotExistForThisUser = !account.users.find(
			user => user.id === userId
		);

		if (accountNotExistForThisUser) {
			throw new BadRequestException(AccountNotExistForThisUser);
		}

		const usersLength = account.users.length;
		const type: AccountTypeEnum = AccountResponse.mapFrom(account).type;

		if (
			accountWithTypeCardAndWithoutUser(type, usersLength) ||
			accountWithTypeCash(type)
		) {
			await Promise.all([
				this.transactionRepository.deleteAllAccountTransactions(id),
				this.accountRepository.removeAccountForUser(userId, id),
				this.accountRepository.removeAccount(id),
			]);
		}

		if (accountWithTypeCardWithUsers(type, usersLength)) {
			await this.accountRepository.removeAccountForUser(userId, id);
		}
	}
}

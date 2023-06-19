import {
	BadRequestException,
	Injectable,
	Logger,
	NotFoundException,
} from '@nestjs/common';
import { TransactionRepository } from 'src/repository/repositories/transaction.repository';
import {
	TransactionRequest,
	LoggerServiceDecorator,
	TransactionResponse,
	FindAllTransactionRequest,
	AccountNotExistForThisUser,
	TransactionNotAvailableForUser,
} from 'src/common';
import { Transaction } from 'src/models';
import { AccountRepository } from 'src/repository';

@Injectable()
export class TransactionService {
	private readonly logger = new Logger(TransactionService.name);

	constructor(
		private readonly transactionRepository: TransactionRepository,
		private readonly accountRepository: AccountRepository
	) {}

	@LoggerServiceDecorator()
	async create(dto: TransactionRequest, userId): Promise<TransactionResponse> {
		const account = await this.accountRepository.getById(dto.accountId, userId);

		if (!account) {
			throw new NotFoundException(AccountNotExistForThisUser);
		}

		const transaction = await this.transactionRepository.create(dto);
		return this.transactionRepository
			.getById(transaction.id, userId)
			.then(TransactionResponse.mapFrom);
	}

	@LoggerServiceDecorator()
	async getById(id: string, userId: string): Promise<Transaction> {
		const transaction = await this.transactionRepository.getById(id, userId);
		if (!transaction) {
			throw new BadRequestException(TransactionNotAvailableForUser);
		}
		return transaction;
	}

	@LoggerServiceDecorator()
	async getAll(id: string, dto: FindAllTransactionRequest): Promise<Transaction[]> {
		return this.transactionRepository.getAll(id, dto);
	}

	@LoggerServiceDecorator()
	async delete(id: string): Promise<void> {
		await this.transactionRepository.delete(id);
	}
}

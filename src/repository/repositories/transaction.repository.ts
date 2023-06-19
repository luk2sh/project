import { InjectModel } from '@nestjs/sequelize';
import { Account, Transaction, User } from 'src/models';
import { Injectable } from '@nestjs/common';
import {
	FindAllTransactionRequest,
	rangeStartAndEndDateUtils,
	TransactionRequest,
} from 'src/common';
import { Includeable } from 'sequelize/types/model';
import { FindOptions, Op, WhereOptions } from 'sequelize';

@Injectable()
export class TransactionRepository {
	constructor(
		@InjectModel(Transaction)
		private readonly transactionModel: typeof Transaction
	) {}

	async create(dto: TransactionRequest): Promise<Transaction> {
		return this.transactionModel.create({ ...dto });
	}

	async getById(id: string, userId: string): Promise<Transaction> {
		return this.transactionModel.findByPk(id, {
			include: [
				{
					model: Account,
					required: true,
					include: [
						{
							model: User,
							where: { id: userId },
							required: true,
						},
					],
				},
			],
		});
	}

	async getAll(id: string, dto: FindAllTransactionRequest): Promise<Transaction[]> {
		const { categoryIds, offset, limit, startDate, endDate } = dto;

		const where: WhereOptions<Transaction> = {};

		if (startDate || endDate) {
			where.createdAt = await rangeStartAndEndDateUtils(startDate, endDate);
		}
		if (categoryIds) {
			where.categoryId = { [Op.or]: [categoryIds] };
		}

		const options: FindOptions = {
			where,
			include: [
				{
					model: Account,
					required: true,
					include: [
						{
							model: User,
							where: { id: id },
							required: true,
						},
					],
				},
			] as Includeable[],
			offset,
			limit,
		};

		return await this.transactionModel.findAll(options);
	}

	async delete(id: string): Promise<void> {
		await this.transactionModel.destroy({ where: { id } });
	}

	async deleteAllAccountTransactions(id: string): Promise<void> {
		await this.transactionModel.destroy({ where: { accountId: id } });
	}
}

import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Category, Subcategory, User, UserAccount } from 'src/models';
import {
	AccountRepository,
	CategoryRepository,
	CurrencyRepository,
	SubcategoryRepository,
	TransactionRepository,
	UsersRepository,
} from './repositories';
import { ConfigService } from '@nestjs/config';
import {
	Account,
	Transaction,
	Budget,
	BudgetAccount,
	BudgetCategory,
	Currency,
	Debt,
	Notification,
	GoalTransaction,
	Goal,
	BudgetSubcategory,
	Country,
} from 'src/models';

const providers = [
	ConfigService,
	UsersRepository,
	CategoryRepository,
	SubcategoryRepository,
	CurrencyRepository,
	AccountRepository,
	TransactionRepository,
];

const model = [
	User,
	Category,
	Subcategory,
	Currency,
	Account,
	Budget,
	BudgetAccount,
	BudgetCategory,
	Transaction,
	Debt,
	Notification,
	BudgetSubcategory,
	Goal,
	GoalTransaction,
	Country,
	UserAccount,
];

@Module({
	imports: [SequelizeModule.forFeature([...model])],
	providers: [...providers],
	exports: [...providers],
})
export class RepositoryModule {}

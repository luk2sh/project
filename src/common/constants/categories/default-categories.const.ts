import { CategoryColorEnum, CategoryTypeEnum, ImageEnum } from 'src/common/enums';

export const defaultCategories = [
	{
		name: 'Expense',
		type: CategoryTypeEnum.Accounts,
		color: CategoryColorEnum.Blue,
		image: ImageEnum.Expense,
	},
	{
		name: 'Transfer',
		type: CategoryTypeEnum.Expenses,
		color: CategoryColorEnum.Red,
		image: ImageEnum.Transfer,
	},
	{
		name: 'Food and Dining',
		type: CategoryTypeEnum.Incomes,
		color: CategoryColorEnum.Red,
		image: ImageEnum.Shopping,
	},
	{
		name: 'Travel',
		type: CategoryTypeEnum.Expenses,
		color: CategoryColorEnum.Green,
		image: ImageEnum.Travel,
	},
	{
		name: 'Personal Care',
		type: CategoryTypeEnum.Incomes,
		color: CategoryColorEnum.Yellow,
		image: ImageEnum.Expense,
	},
];

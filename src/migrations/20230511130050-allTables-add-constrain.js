module.exports = {
	async up(queryInterface) {
		const transaction = await queryInterface.sequelize.transaction();

		try {
			await queryInterface.sequelize.query(
				'ALTER TABLE "Accounts" DROP CONSTRAINT IF EXISTS "Accounts_userId_fkey"'
			);
			await queryInterface.sequelize.query(
				'ALTER TABLE "Accounts" DROP CONSTRAINT IF EXISTS "Accounts_currencyId_fkey"'
			);
			await queryInterface.sequelize.query(
				'ALTER TABLE "Budgets" DROP CONSTRAINT IF EXISTS "Budgets_userId_fkey"'
			);
			await queryInterface.sequelize.query(
				'ALTER TABLE "Budgets" DROP CONSTRAINT IF EXISTS "Budgets_currencyId_fkey"'
			);
			await queryInterface.sequelize.query(
				'ALTER TABLE "Transactions" DROP CONSTRAINT IF EXISTS "Transactions_accountId_fkey"'
			);
			await queryInterface.sequelize.query(
				'ALTER TABLE "Transactions" DROP CONSTRAINT IF EXISTS "Transactions_categoriesId_fkey"'
			);
			await queryInterface.sequelize.query(
				'ALTER TABLE "Transactions" DROP CONSTRAINT IF EXISTS "Transactions_subcategoriesId_fkey"'
			);
			await queryInterface.sequelize.query(
				'ALTER TABLE "Debts" DROP CONSTRAINT IF EXISTS "Debts_currencyId_fkey"'
			);
			await queryInterface.sequelize.query(
				'ALTER TABLE "Debts" DROP CONSTRAINT IF EXISTS "Debts_borrowedId_fkey"'
			);
			await queryInterface.sequelize.query(
				'ALTER TABLE "Debts" DROP CONSTRAINT IF EXISTS "Debts_lentId_fkey"'
			);
			await queryInterface.sequelize.query(
				'ALTER TABLE "Debts" DROP CONSTRAINT IF EXISTS "Debts_createdId_fkey"'
			);
			await queryInterface.sequelize.query(
				'ALTER TABLE "Notifications" DROP CONSTRAINT IF EXISTS "Notifications_userId_fkey"'
			);
			await queryInterface.sequelize.query(
				'ALTER TABLE "Notifications" DROP CONSTRAINT IF EXISTS "Notifications_receiverId_fkey"'
			);
			await queryInterface.sequelize.query(
				' ALTER TABLE "Notifications" DROP CONSTRAINT IF EXISTS "Notifications_debtId_fkey"'
			);
			await queryInterface.sequelize.query(
				'ALTER TABLE "budgetCategories" DROP CONSTRAINT IF EXISTS "budgetCategories_budgetId_fkey"'
			);
			await queryInterface.sequelize.query(
				'ALTER TABLE "budgetCategories" DROP CONSTRAINT IF EXISTS "budgetCategories_categoriesId_fkey"'
			);
			await queryInterface.sequelize.query(
				'ALTER TABLE "budgetAccounts" DROP CONSTRAINT IF EXISTS "budgetAccounts_budgetsId_fkey"'
			);
			await queryInterface.sequelize.query(
				'ALTER TABLE "budgetAccounts" DROP CONSTRAINT IF EXISTS "budgetAccounts_accountId_fkey"'
			);
			await queryInterface.sequelize.query(
				'ALTER TABLE "budgetSubcategories" DROP CONSTRAINT IF EXISTS "budgetSubcategories_budgetId_fkey"'
			);
			await queryInterface.sequelize.query(
				'ALTER TABLE "budgetSubcategories" DROP CONSTRAINT IF EXISTS "budgetSubcategories_subcategoryId_fkey"'
			);

			await queryInterface.addConstraint(
				'Accounts',
				{
					type: 'foreign key',
					name: 'Accounts_userId_fkey',
					fields: ['userId'],
					references: {
						table: 'Users',
						field: 'id',
					},
					onUpdate: 'CASCADE',
					onDelete: 'CASCADE',
				},
				{ transaction }
			);

			await queryInterface.addConstraint(
				'Accounts',
				{
					type: 'foreign key',
					name: 'Accounts_currencyId_fkey',
					fields: ['currencyId'],
					references: {
						table: 'Currencies',
						field: 'id',
					},
					onUpdate: 'CASCADE',
					onDelete: 'CASCADE',
				},
				{ transaction }
			);

			await queryInterface.addConstraint(
				'Budgets',
				{
					type: 'foreign key',
					name: 'Budgets_userId_fkey',
					fields: ['userId'],
					references: {
						table: 'Users',
						field: 'id',
					},
					onUpdate: 'CASCADE',
					onDelete: 'CASCADE',
				},
				{ transaction }
			);

			await queryInterface.addConstraint(
				'Budgets',
				{
					type: 'foreign key',
					name: 'Budgets_currencyId_fkey',
					fields: ['currencyId'],
					references: {
						table: 'Currencies',
						field: 'id',
					},
					onUpdate: 'CASCADE',
					onDelete: 'CASCADE',
				},
				{ transaction }
			);

			await queryInterface.addConstraint(
				'Transactions',
				{
					type: 'foreign key',
					name: 'Transactions_accountId_fkey',
					fields: ['accountId'],
					references: {
						table: 'Accounts',
						field: 'id',
					},
					onUpdate: 'CASCADE',
					onDelete: 'CASCADE',
				},
				{ transaction }
			);

			await queryInterface.addConstraint(
				'Transactions',
				{
					type: 'foreign key',
					name: 'Transactions_categoriesId_fkey',
					fields: ['categoryId'],
					references: {
						table: 'Categories',
						field: 'id',
					},
					onUpdate: 'CASCADE',
					onDelete: 'CASCADE',
				},
				{ transaction }
			);

			await queryInterface.addConstraint(
				'Transactions',
				{
					type: 'foreign key',
					name: 'Transactions_subcategoriesId_fkey',
					fields: ['subCategoryId'],
					references: {
						table: 'Subcategories',
						field: 'id',
					},
					onUpdate: 'CASCADE',
					onDelete: 'CASCADE',
				},
				{ transaction }
			);

			await queryInterface.addConstraint(
				'Debts',
				{
					type: 'foreign key',
					name: 'Debts_currencyId_fkey',
					fields: ['currencyId'],
					references: {
						table: 'Currencies',
						field: 'id',
					},
					onUpdate: 'CASCADE',
					onDelete: 'CASCADE',
				},
				{ transaction }
			);

			await queryInterface.addConstraint(
				'Debts',
				{
					type: 'foreign key',
					name: 'Debts_borrowedId_fkey',
					fields: ['borrowedId'],
					references: {
						table: 'Users',
						field: 'id',
					},
					onUpdate: 'CASCADE',
					onDelete: 'CASCADE',
				},
				{ transaction }
			);

			await queryInterface.addConstraint(
				'Debts',
				{
					type: 'foreign key',
					name: 'Debts_lentId_fkey',
					fields: ['lentId'],
					references: {
						table: 'Users',
						field: 'id',
					},
					onUpdate: 'CASCADE',
					onDelete: 'CASCADE',
				},
				{ transaction }
			);

			await queryInterface.addConstraint(
				'Debts',
				{
					type: 'foreign key',
					name: 'Debts_createdId_fkey',
					fields: ['createdId'],
					references: {
						table: 'Users',
						field: 'id',
					},
					onUpdate: 'CASCADE',
					onDelete: 'CASCADE',
				},
				{ transaction }
			);

			await queryInterface.addConstraint(
				'Notifications',
				{
					type: 'foreign key',
					name: 'Notifications_userId_fkey',
					fields: ['userId'],
					references: {
						table: 'Users',
						field: 'id',
					},
					onUpdate: 'CASCADE',
					onDelete: 'CASCADE',
				},
				{ transaction }
			);

			await queryInterface.addConstraint(
				'Notifications',
				{
					type: 'foreign key',
					name: 'Notifications_receiverId_fkey',
					fields: ['receiverId'],
					references: {
						table: 'Users',
						field: 'id',
					},
					onUpdate: 'CASCADE',
					onDelete: 'CASCADE',
				},
				{ transaction }
			);

			await queryInterface.addConstraint(
				'Notifications',
				{
					type: 'foreign key',
					name: 'Notifications_debtId_fkey',
					fields: ['debtId'],
					references: {
						table: 'Debts',
						field: 'id',
					},
					onUpdate: 'CASCADE',
					onDelete: 'CASCADE',
				},
				{ transaction }
			);

			await queryInterface.addConstraint(
				'budgetCategories',
				{
					type: 'foreign key',
					name: 'budgetCategories_budgetId_fkey',
					fields: ['budgetId'],
					references: {
						table: 'Budgets',
						field: 'id',
					},
					onUpdate: 'CASCADE',
					onDelete: 'CASCADE',
				},
				{ transaction }
			);

			await queryInterface.addConstraint(
				'budgetCategories',
				{
					type: 'foreign key',
					name: 'budgetCategories_categoriesId_fkey',
					fields: ['categoryId'],
					references: {
						table: 'Categories',
						field: 'id',
					},
					onUpdate: 'CASCADE',
					onDelete: 'CASCADE',
				},
				{ transaction }
			);

			await queryInterface.addConstraint(
				'budgetAccounts',
				{
					type: 'foreign key',
					name: 'budgetAccounts_budgetsId_fkey',
					fields: ['budgetId'],
					references: {
						table: 'Budgets',
						field: 'id',
					},
					onUpdate: 'CASCADE',
					onDelete: 'CASCADE',
				},
				{ transaction }
			);

			await queryInterface.addConstraint(
				'budgetAccounts',
				{
					type: 'foreign key',
					name: 'budgetAccounts_accountId_fkey',
					fields: ['accountId'],
					references: {
						table: 'Accounts',
						field: 'id',
					},
					onUpdate: 'CASCADE',
					onDelete: 'CASCADE',
				},
				{ transaction }
			);

			await queryInterface.addConstraint(
				'budgetSubcategories',
				{
					type: 'foreign key',
					name: 'budgetSubcategories_budgetId_fkey',
					fields: ['budgetId'],
					references: {
						table: 'Budgets',
						field: 'id',
					},
					onUpdate: 'CASCADE',
					onDelete: 'CASCADE',
				},
				{ transaction }
			);

			await queryInterface.addConstraint(
				'budgetSubcategories',
				{
					type: 'foreign key',
					name: 'budgetSubcategories_subcategoryId_fkey',
					fields: ['subcategoryId'],
					references: {
						table: 'Subcategories',
						field: 'id',
					},
					onUpdate: 'CASCADE',
					onDelete: 'CASCADE',
				},
				{ transaction }
			);
			await transaction.commit();
		} catch (e) {
			await transaction.rollback();
		}
	},

	async down(queryInterface) {
		const transaction = await queryInterface.sequelize.transaction();

		try {
			await queryInterface.removeConstraint('Accounts', 'Accounts_userId_fkey', {
				transaction,
			});
			await queryInterface.removeConstraint(
				'Accounts',
				'Accounts_currencyId_fkey',
				{ transaction }
			);
			await queryInterface.removeConstraint('Budgets', 'Budgets_userId_fkey', {
				transaction,
			});
			await queryInterface.removeConstraint('Budgets', 'Budgets_currencyId_fkey', {
				transaction,
			});
			await queryInterface.removeConstraint(
				'Transactions',
				'Transactions_accountId_fkey',
				{ transaction }
			);
			await queryInterface.removeConstraint(
				'Transactions',
				'Transactions_categoriesId_fkey',
				{ transaction }
			);
			await queryInterface.removeConstraint(
				'Transactions',
				'Transactions_subcategoriesId_fkey',
				{ transaction }
			);
			await queryInterface.removeConstraint('Debts', 'Debts_currencyId_fkey', {
				transaction,
			});
			await queryInterface.removeConstraint('Debts', 'Debts_borrowedId_fkey', {
				transaction,
			});
			await queryInterface.removeConstraint('Debts', 'Debts_lentId_fkey', {
				transaction,
			});
			await queryInterface.removeConstraint('Debts', 'Debts_createdId_fkey', {
				transaction,
			});
			await queryInterface.removeConstraint(
				'Notifications',
				'Notifications_userId_fkey',
				{ transaction }
			);
			await queryInterface.removeConstraint(
				'Notifications',
				'Notifications_receiverId_fkey',
				{ transaction }
			);
			await queryInterface.removeConstraint(
				'Notifications',
				'Notifications_debtId_fkey',
				{ transaction }
			);
			await queryInterface.removeConstraint(
				'budgetCategories',
				'budgetCategories_budgetId_fkey',
				{ transaction }
			);
			await queryInterface.removeConstraint(
				'budgetCategories',
				'budgetCategories_categoriesId_fkey',
				{ transaction }
			);
			await queryInterface.removeConstraint(
				'budgetAccounts',
				'budgetAccounts_budgetsId_fkey',
				{ transaction }
			);
			await queryInterface.removeConstraint(
				'budgetAccounts',
				'budgetAccounts_accountId_fkey',
				{ transaction }
			);
			await queryInterface.removeConstraint(
				'budgetSubcategories',
				'budgetSubcategories_budgetId_fkey',
				{ transaction }
			);
			await queryInterface.removeConstraint(
				'budgetSubcategories',
				'budgetSubcategories_subcategoryId_fkey',
				{ transaction }
			);

			await transaction.commit();
		} catch (e) {
			await transaction.rollback();
			throw new Error(e);
		}
	},
};

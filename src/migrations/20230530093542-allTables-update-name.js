module.exports = {
	async up(queryInterface, Sequelize) {
		const transaction = await queryInterface.sequelize.transaction();

		try {
			await queryInterface.removeColumn('Accounts', 'currencyId', { transaction });

			await queryInterface.addColumn(
				'Accounts',
				'currencyId',
				{
					type: Sequelize.STRING,
					allowNull: false,
				},
				{ transaction }
			);

			await queryInterface.renameTable('usersAccounts', 'UserAccounts', {
				transaction,
			});

			await queryInterface.removeColumn('Accounts', 'userId', { transaction });

			await queryInterface.renameTable('GoalsTransaction', 'GoalTransactions', {
				transaction,
			});

			await queryInterface.renameTable('budgetAccounts', 'BudgetAccounts', {
				transaction,
			});

			await queryInterface.renameTable('budgetCategories', 'BudgetCategories', {
				transaction,
			});

			await queryInterface.renameTable(
				'budgetSubcategories',
				'BudgetSubcategories',
				{ transaction }
			);

			await transaction.commit();
		} catch (error) {
			await transaction.rollback();
			throw new Error(error);
		}
	},

	async down(queryInterface, Sequelize) {
		const transaction = await queryInterface.sequelize.transaction();

		try {
			await queryInterface.changeColumn(
				'accounts',
				'currencyId',
				{
					type: Sequelize.STRING,
					allowNull: true,
				},
				{ transaction }
			);

			await queryInterface.addColumn(
				'accounts',
				'userId',
				{
					type: Sequelize.UUID,
				},
				{ transaction }
			);

			await queryInterface.renameTable('UserAccounts', 'usersAccounts', {
				transaction,
			});

			await queryInterface.renameTable('GoalTransactions', 'GoalsTransaction', {
				transaction,
			});

			await queryInterface.renameTable('BudgetAccounts', 'budgetAccounts', {
				transaction,
			});

			await queryInterface.renameTable('BudgetCategories', 'budgetCategories', {
				transaction,
			});

			await queryInterface.renameTable(
				'BudgetSubcategories',
				'budgetSubcategories',
				{ transaction }
			);

			await transaction.commit();
		} catch (error) {
			throw new Error(error);
		}
	},
};

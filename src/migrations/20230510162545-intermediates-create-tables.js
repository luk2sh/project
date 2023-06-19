module.exports = {
	async up(queryInterface, Sequelize) {
		const transaction = await queryInterface.sequelize.transaction();

		try {
			await queryInterface.createTable(
				'budgetCategories',
				{
					id: {
						type: Sequelize.UUID,
					},
					budgetId: {
						type: Sequelize.UUID,
					},
					categoryId: {
						type: Sequelize.UUID,
					},
				},
				{
					timestamps: false,
				},
				{ transaction }
			);

			await queryInterface.createTable(
				'budgetAccounts',
				{
					id: {
						type: Sequelize.UUID,
					},
					budgetId: {
						type: Sequelize.UUID,
					},
					accountId: {
						type: Sequelize.UUID,
					},
				},
				{ transaction }
			);

			await queryInterface.createTable(
				'budgetSubcategories',
				{
					id: {
						type: Sequelize.UUID,
					},
					budgetId: {
						type: Sequelize.UUID,
					},
					subcategoryId: {
						type: Sequelize.UUID,
					},
				},
				{ transaction }
			);

			await transaction.commit();
		} catch (e) {
			await transaction.rollback();
			throw new Error(e);
		}
	},

	async down(queryInterface) {
		const transaction = await queryInterface.sequelize.transaction();

		try {
			await queryInterface.dropTable('budgetCategories', { transaction });
			await queryInterface.dropTable('budgetAccounts', { transaction });
			await queryInterface.dropTable('budgetSubcategories', { transaction });
			await transaction.commit();
		} catch (e) {
			await transaction.rollback();
			throw new Error(e);
		}
	},
};

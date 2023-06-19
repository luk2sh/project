module.exports = {
	async up(queryInterface, Sequelize) {
		const transaction = await queryInterface.sequelize.transaction();

		try {
			await queryInterface.createTable(
				'Transactions',
				{
					id: {
						type: Sequelize.UUID,
						primaryKey: true,
					},
					amount: {
						type: Sequelize.INTEGER,
						allowNull: false,
					},
					currencyId: {
						type: Sequelize.STRING,
						allowNull: false,
					},
					categoryId: {
						type: Sequelize.UUID,
						allowNull: false,
					},
					subCategoryId: {
						type: Sequelize.UUID,
					},
					accountId: {
						type: Sequelize.UUID,
						allowNull: false,
					},
					createdAt: {
						type: Sequelize.DATE,
					},
					updatedAt: {
						type: Sequelize.DATE,
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

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('Transactions');
	},
};

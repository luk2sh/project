module.exports = {
	async up(queryInterface, Sequelize) {
		const transaction = await queryInterface.sequelize.transaction();

		try {
			await queryInterface.createTable(
				'Budgets',
				{
					id: {
						type: Sequelize.UUID,
						primaryKey: true,
					},
					userId: {
						type: Sequelize.UUID,
						allowNull: false,
					},
					name: {
						type: Sequelize.STRING,
						allowNull: false,
					},
					amount: {
						type: Sequelize.INTEGER,
						allowNull: false,
					},
					currencyId: {
						type: Sequelize.STRING,
						allowNull: false,
					},
					startDate: {
						type: Sequelize.DATE,
						allowNull: false,
					},
					endDate: {
						type: Sequelize.DATE,
						allowNull: false,
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
			await queryInterface.dropTable('Budgets', { transaction });
			await transaction.commit();
		} catch (e) {
			await transaction.rollback();
			throw new Error(e);
		}
	},
};

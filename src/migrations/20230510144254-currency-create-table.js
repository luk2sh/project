module.exports = {
	async up(queryInterface, Sequelize) {
		const transaction = await queryInterface.sequelize.transaction();

		try {
			await queryInterface.createTable(
				'Currencies',
				{
					id: {
						type: Sequelize.STRING,
						primaryKey: true,
					},
					currencyCode: {
						type: Sequelize.INTEGER,
						allowNull: false,
					},
					name: {
						type: Sequelize.STRING,
						allowNull: false,
					},
					country: {
						type: Sequelize.STRING,
						allowNull: false,
					},
					symbol: {
						type: Sequelize.INTEGER,
					},
					exchangeRate: {
						type: Sequelize.STRING,
						allowNull: false,
					},
					exchangeRateUpdatedAt: {
						type: Sequelize.STRING,
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
			await queryInterface.dropTable('Currencies');
			await transaction.commit();
		} catch (e) {
			await transaction.rollback();
			throw new Error(e);
		}
	},
};

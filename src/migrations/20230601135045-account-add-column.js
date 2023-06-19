module.exports = {
	async up(queryInterface, Sequelize) {
		const transaction = await queryInterface.sequelize.transaction();

		try {
			await queryInterface.addColumn(
				'Accounts',
				'balance',
				{
					type: Sequelize.FLOAT,
					defaultValue: 0,
				},
				{ transaction }
			);

			await queryInterface.removeColumn('Transactions', 'amount', { transaction });

			await queryInterface.addColumn(
				'Transactions',
				'amount',
				{
					type: Sequelize.FLOAT,
				},
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
			await queryInterface.removeColumn('Accounts', 'balance', { transaction });

			await queryInterface.removeColumn('Transactions', 'amount', { transaction });
			await queryInterface.addColumn(
				'Transactions',
				'amount',
				{
					type: Sequelize.INTEGER,
					allowNull: false,
				},
				{ transaction }
			);

			await transaction.commit();
		} catch (error) {
			await transaction.rollback();
			throw new Error(error);
		}
	},
};

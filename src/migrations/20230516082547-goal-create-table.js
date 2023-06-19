const { Error } = require('sequelize');
module.exports = {
	async up(queryInterface, Sequelize) {
		const transaction = await queryInterface.sequelize.transaction();

		try {
			await queryInterface.createTable(
				'Goals',
				{
					id: {
						type: Sequelize.UUID,
						primaryKey: true,
					},
					name: {
						type: Sequelize.STRING,
					},
					amount: {
						type: Sequelize.INTEGER,
					},
					balance: {
						type: Sequelize.INTEGER,
					},
					currencyId: {
						type: Sequelize.STRING,
					},
					userId: {
						type: Sequelize.UUID,
					},
					createdAt: {
						type: Sequelize.DATE,
					},
					updatedAt: {
						type: Sequelize.DATE,
					},
					endDate: {
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

	async down(queryInterface) {
		const transaction = await queryInterface.sequelize.transaction();

		try {
			await queryInterface.dropTable('Goals', { transaction });
			await transaction.commit();
		} catch (e) {
			await transaction.rollback();
			throw new Error(e);
		}
	},
};

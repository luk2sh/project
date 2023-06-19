module.exports = {
	async up(queryInterface, Sequelize) {
		const transaction = await queryInterface.sequelize.transaction();

		try {
			await queryInterface.createTable(
				'Debts',
				{
					id: {
						type: Sequelize.UUID,
						primaryKey: true,
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
					status: {
						type: Sequelize.STRING,
					},
					completed: {
						type: Sequelize.BOOLEAN,
						allowNull: false,
					},
					borrowedId: {
						type: Sequelize.UUID,
					},
					lentId: {
						type: Sequelize.UUID,
					},
					createdId: {
						type: Sequelize.UUID,
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
			await queryInterface.dropTable('Debts', { transaction });
			await transaction.commit();
		} catch (e) {
			await transaction.rollback();
			throw new Error(e);
		}
	},
};

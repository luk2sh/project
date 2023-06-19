module.exports = {
	async up(queryInterface, Sequelize) {
		const transaction = await queryInterface.sequelize.transaction();

		try {
			await queryInterface.createTable(
				'Accounts',
				{
					id: {
						type: Sequelize.UUID,
						primaryKey: true,
					},
					name: {
						type: Sequelize.STRING,
						allowNull: false,
					},
					description: {
						type: Sequelize.STRING,
					},
					userId: {
						type: Sequelize.UUID,
					},
					currencyId: {
						type: Sequelize.STRING,
					},
					cardNumber: {
						type: Sequelize.STRING,
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
		await queryInterface.dropTable('Accounts');
	},
};

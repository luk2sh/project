module.exports = {
	async up(queryInterface, Sequelize) {
		const transaction = await queryInterface.sequelize.transaction();

		try {
			await queryInterface.createTable(
				'Notifications',
				{
					id: {
						type: Sequelize.UUID,
						primaryKey: true,
					},
					active: {
						type: Sequelize.BOOLEAN,
						allowNull: false,
					},
					userId: {
						type: Sequelize.UUID,
						allowNull: false,
					},
					receiverId: {
						type: Sequelize.UUID,
					},
					type: {
						type: Sequelize.STRING,
						allowNull: false,
					},
					debtId: {
						type: Sequelize.UUID,
					},
					createdAt: {
						type: Sequelize.DATE,
					},
				},
				{
					timestamp: true,
					updatedAt: false,
					transaction,
				}
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
			await queryInterface.dropTable('Notifications');
			await transaction.commit();
		} catch (e) {
			await transaction.rollback();
			throw new Error(e);
		}
	},
};

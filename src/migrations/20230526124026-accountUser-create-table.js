module.exports = {
	async up(queryInterface, Sequelize) {
		const transaction = await queryInterface.sequelize.transaction();

		try {
			await queryInterface.createTable(
				'usersAccounts',
				{
					id: {
						type: Sequelize.UUID,
						primaryKey: true,
					},
					userId: {
						type: Sequelize.UUID,
					},
					accountId: {
						type: Sequelize.UUID,
					},
				},
				{
					transaction,
				}
			);

			await transaction.commit();
		} catch (e) {
			await transaction.rollback();
			throw new Error(e);
		}
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('usersAccounts');
	},
};

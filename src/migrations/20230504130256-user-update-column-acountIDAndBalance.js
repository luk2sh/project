module.exports = {
	async up(queryInterface, Sequelize) {
		const transaction = await queryInterface.sequelize.transaction();
		try {
			await queryInterface.addColumn(
				'Users',
				'accountId',
				{
					type: Sequelize.INTEGER,
					autoIncrement: true,
				},
				{ transaction }
			);

			await queryInterface.renameColumn('Users', 'total', 'balance', {
				transaction,
			});

			await transaction.commit();
		} catch (err) {
			await transaction.rollback();
		}
	},

	async down(queryInterface, Sequelize) {
		const transaction = await queryInterface.sequelize.transaction();
		try {
			await queryInterface.removeColumn('Users', 'accountId', { transaction });
			await queryInterface.renameColumn('Users', 'balance', 'total', {
				transaction,
			});
			await transaction.commit();
		} catch (err) {
			await transaction.rollback();
		}
	},
};

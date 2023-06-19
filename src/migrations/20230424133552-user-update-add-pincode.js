'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		const transaction = await queryInterface.sequelize.transaction();

		try {
			await queryInterface.addColumn(
				'Users',
				'pincode',
				{
					type: Sequelize.STRING,
					allowNull: true,
				},
				{ transaction }
			);
			await queryInterface.addColumn(
				'Users',
				'intermediateToken',
				{
					type: Sequelize.STRING,
					allowNull: true,
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
			await queryInterface.removeColumn('Users', 'pincode', { transaction });
			await queryInterface.removeColumn('Users', 'intermediateToken', {
				transaction,
			});
			await transaction.commit();
		} catch (err) {
			await transaction.rollback();
			throw err;
		}
	},
};

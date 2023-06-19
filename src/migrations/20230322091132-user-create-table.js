'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		const transaction = await queryInterface.sequelize.transaction();

		try {
			await queryInterface.createTable(
				'Users',
				{
					id: {
						type: Sequelize.UUID,
						primaryKey: true,
					},
					email: {
						type: Sequelize.STRING,
						allowNull: false,
						unique: true,
					},
					password: {
						type: Sequelize.STRING,
						allowNull: false,
					},
					country: {
						type: Sequelize.STRING,
						allowNull: true,
					},
					currency: {
						type: Sequelize.STRING,
						allowNull: true,
					},
					total: {
						type: Sequelize.INTEGER,
						allowNull: false,
						defaultValue: 0,
					},
					refreshToken: {
						type: Sequelize.STRING,
						allowNull: true,
					},
					createdAt: {
						type: Sequelize.DATE,
					},
					updatedAt: {
						type: Sequelize.DATE,
					},
				},
				{ transaction }
			);

			await transaction.commit();
		} catch (err) {
			await transaction.rollback();
			throw new Error(err);
		}
	},

	async down(queryInterface) {
		await queryInterface.dropTable('Users');
	},
};

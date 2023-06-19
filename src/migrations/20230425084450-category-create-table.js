'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		const transaction = await queryInterface.sequelize.transaction();

		try {
			await queryInterface.createTable(
				'Categories',
				{
					id: {
						type: Sequelize.UUID,
						primaryKey: true,
					},
					name: {
						type: Sequelize.STRING,
					},
					type: {
						type: Sequelize.STRING,
					},
					color: {
						type: Sequelize.STRING,
					},
					userId: {
						unique: false,
						type: Sequelize.UUID,
						references: {
							model: {
								tableName: 'Users',
							},
							key: 'id',
						},
						allowNull: false,
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
		await queryInterface.dropTable('Categories');
	},
};

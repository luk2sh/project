module.exports = {
	async up(queryInterface, Sequelize) {
		const transaction = await queryInterface.sequelize.transaction();

		try {
			await queryInterface.createTable(
				'Subcategories',
				{
					id: {
						type: Sequelize.UUID,
						primaryKey: true,
					},
					name: {
						type: Sequelize.STRING,
					},
					icon: {
						type: Sequelize.STRING,
					},
					categoryId: {
						unique: false,
						type: Sequelize.UUID,
						references: {
							model: {
								tableName: 'Categories',
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
			await queryInterface.dropTable('Subcategories');
			throw new Error(err);
		}
	},

	async down(queryInterface, Sequelize) {
		return Promise.resolve();
	},
};

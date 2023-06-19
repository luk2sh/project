module.exports = {
	async up(queryInterface) {
		const transaction = await queryInterface.sequelize.transaction();

		try {
			await queryInterface.removeColumn('Categories', 'createdAt');
			await queryInterface.removeColumn('Categories', 'updatedAt');

			await queryInterface.renameColumn('Categories', 'icon', 'image');
			await queryInterface.renameColumn('Subcategories', 'icon', 'image');

			await transaction.commit();
		} catch (e) {
			await transaction.rollback();
			throw new Error(e);
		}
	},

	async down(queryInterface, Sequelize) {
		const transaction = await queryInterface.sequelize.transaction();

		try {
			await queryInterface.addColumn('Categories', 'createdAt', {
				type: Sequelize.DATE,
			});

			await queryInterface.addColumn('Categories', 'updatedAt', {
				type: Sequelize.DATE,
			});

			await queryInterface.renameColumn('Categories', 'image', 'icon');

			await queryInterface.renameColumn('Subcategories', 'image', 'icon');

			await transaction.commit();
		} catch (e) {
			await transaction.rollback();
			throw new Error(e);
		}
	},
};

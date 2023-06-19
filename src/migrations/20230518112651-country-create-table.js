module.exports = {
	async up(queryInterface, Sequelize) {
		const transaction = await queryInterface.sequelize.transaction();

		try {
			await queryInterface.createTable(
				'Countries',
				{
					id: {
						type: Sequelize.STRING,
						primaryKey: true,
					},
					name: {
						type: Sequelize.STRING,
						allowNull: false,
					},
					currencyId: {
						type: Sequelize.STRING,
					},
				},
				{ transaction }
			);
			await queryInterface.removeColumn('Currencies', 'country', { transaction });
			await queryInterface.renameColumn('Users', 'country', 'countryId', {
				transaction,
			});

			await transaction.commit();
		} catch (e) {
			await transaction.rollback();
			throw new Error(e);
		}
	},

	async down(queryInterface, Sequelize) {
		const transaction = await queryInterface.sequelize.transaction();

		try {
			await queryInterface.dropTable('Countries', { transaction });
			await queryInterface.addColumn(
				'Currencies',
				'country',
				{ type: Sequelize.STRING },
				{ transaction }
			);
			await queryInterface.renameColumn('Users', 'countryId', 'country', {
				transaction,
			});

			await transaction.commit();
		} catch (e) {
			await transaction.rollback();
			throw new Error(e);
		}
	},
};

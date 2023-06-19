module.exports = {
	async up(queryInterface) {
		const transaction = await queryInterface.sequelize.transaction();

		try {
			await queryInterface.sequelize.query(
				'ALTER TABLE "Countries"  DROP CONSTRAINT IF EXISTS "Countries_currencyId_fkey"'
			);

			await queryInterface.sequelize.query(
				'ALTER TABLE "Users"  DROP CONSTRAINT IF EXISTS "Users_countryId_fkey"'
			);

			await queryInterface.addConstraint(
				'Users',
				{
					type: 'foreign key',
					name: 'Users_countryId_fkey',
					fields: ['countryId'],
					references: {
						table: 'Countries',
						field: 'id',
					},
					onUpdate: 'CASCADE',
					onDelete: 'CASCADE',
				},
				{ transaction }
			);

			await queryInterface.addConstraint(
				'Countries',
				{
					type: 'foreign key',
					name: 'Countries_currencyId_fkey',
					fields: ['currencyId'],
					references: {
						table: 'Currencies',
						field: 'id',
					},
					onUpdate: 'CASCADE',
					onDelete: 'CASCADE',
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
			await queryInterface.removeConstraint('Users', 'Users_countryId_fkey');
			await queryInterface.removeConstraint(
				'Countries',
				'Countries_currencyId_fkey'
			);

			await transaction.commit();
		} catch (e) {
			await transaction.rollback();
			throw new Error(e);
		}
	},
};

module.exports = {
	async up(queryInterface) {
		const transaction = await queryInterface.sequelize.transaction();

		try {
			await queryInterface.sequelize.query(
				'ALTER TABLE "GoalsTransaction" DROP CONSTRAINT IF EXISTS "GoalsTransaction_goalId_fkey"'
			);
			await queryInterface.sequelize.query(
				'ALTER TABLE "GoalsTransaction" DROP CONSTRAINT IF EXISTS "GoalsTransaction_currencyId_fkey"'
			);

			await queryInterface.addConstraint(
				'GoalsTransaction',
				{
					type: 'foreign key',
					name: 'GoalsTransaction_goalId_fkey',
					fields: ['goalId'],
					references: {
						table: 'Goals',
						field: 'id',
					},
					onUpdate: 'CASCADE',
					onDelete: 'CASCADE',
				},
				{ transaction }
			);

			await queryInterface.addConstraint(
				'GoalsTransaction',
				{
					type: 'foreign key',
					name: 'GoalsTransaction_currencyId_fkey',
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
			await queryInterface.removeConstraint(
				'GoalsTransaction',
				'GoalsTransaction_goalId_fkey',
				{ transaction }
			);
			await queryInterface.removeConstraint(
				'GoalsTransaction',
				'GoalsTransaction_currencyId_fkey',
				{ transaction }
			);

			await transaction.commit();
		} catch (e) {
			await transaction.rollback();
			throw new Error(e);
		}
	},
};

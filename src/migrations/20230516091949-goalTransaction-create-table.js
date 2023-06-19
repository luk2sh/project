module.exports = {
	async up(queryInterface, Sequelize) {
		const transaction = await queryInterface.sequelize.transaction();

		try {
			await queryInterface.sequelize.query(
				'ALTER TABLE "Goals" DROP CONSTRAINT IF EXISTS "Goals_userId_fkey"'
			);
			await queryInterface.sequelize.query(
				'ALTER TABLE "Goals" DROP CONSTRAINT IF EXISTS "Goals_currencyId_fkey"'
			);

			await queryInterface.addConstraint(
				'Goals',
				{
					type: 'foreign key',
					name: 'Goals_userId_fkey',
					fields: ['userId'],
					references: {
						table: 'Users',
						field: 'id',
					},
					onUpdate: 'CASCADE',
					onDelete: 'CASCADE',
				},
				{ transaction }
			);

			await queryInterface.addConstraint(
				'Goals',
				{
					type: 'foreign key',
					name: 'Goals_currencyId_fkey',
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

			await queryInterface.createTable(
				'GoalsTransaction',
				{
					id: {
						primaryKey: true,
						type: Sequelize.UUID,
					},
					goalId: {
						type: Sequelize.UUID,
					},
					amount: {
						type: Sequelize.INTEGER,
					},
					currencyId: {
						type: Sequelize.STRING,
					},
					createdAt: {
						type: Sequelize.DATE,
					},
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
			await queryInterface.removeConstraint('Goals', 'Goals_userId_fkey', {
				transaction,
			});
			await queryInterface.removeConstraint('Goals', 'Goals_currencyId_fkey', {
				transaction,
			});
			await queryInterface.dropTable('GoalsTransaction');

			await transaction.commit();
		} catch (e) {
			await transaction.rollback();
			throw new Error(e);
		}
	},
};

module.exports = {
	async up(queryInterface) {
		await queryInterface.sequelize.query(
			'ALTER TABLE "Accounts" DROP CONSTRAINT IF EXISTS "Accounts_userId_fkey"'
		);
		await queryInterface.sequelize.query(
			'ALTER TABLE "usersAccounts" DROP CONSTRAINT IF EXISTS "usersAccounts_userId_fkey"'
		);
		await queryInterface.sequelize.query(
			'ALTER TABLE "usersAccounts" DROP CONSTRAINT IF EXISTS "usersAccounts_accountId_fkey"'
		);

		await queryInterface.addConstraint('usersAccounts', {
			type: 'foreign key',
			name: 'usersAccounts_accountId_fkey',
			fields: ['accountId'],
			references: {
				table: 'Accounts',
				field: 'id',
			},
			onUpdate: 'CASCADE',
			onDelete: 'CASCADE',
		});

		await queryInterface.addConstraint('usersAccounts', {
			type: 'foreign key',
			name: 'usersAccounts_userId_fkey',
			fields: ['userId'],
			references: {
				table: 'Users',
				field: 'id',
			},
			onUpdate: 'CASCADE',
			onDelete: 'CASCADE',
		});
	},

	async down(queryInterface) {
		await queryInterface.sequelize.query(
			'ALTER TABLE "usersAccounts" DROP CONSTRAINT IF EXISTS "usersAccounts_userId_fkey"'
		);
		await queryInterface.sequelize.query(
			'ALTER TABLE "usersAccounts" DROP CONSTRAINT IF EXISTS "usersAccounts_accountId_fkey"'
		);

		await queryInterface.addConstraint('Accounts', {
			type: 'foreign key',
			name: 'Accounts_userId_fkey',
			fields: ['userId'],
			references: {
				table: 'Users',
				field: 'id',
			},
			onUpdate: 'CASCADE',
			onDelete: 'CASCADE',
		});
	},
};

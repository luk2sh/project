module.exports = {
	async up(queryInterface) {
		await queryInterface.removeColumn('Transactions', 'currencyId');
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.addColumn('Transactions', 'currencyId', {
			type: Sequelize.STRING,
		});
	},
};

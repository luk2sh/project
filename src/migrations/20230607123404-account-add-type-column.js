module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.addColumn('Accounts', 'type', {
			type: Sequelize.STRING,
			allowNull: false,
			defaultValue: '',
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.removeColumn('Accounts', 'type');
	},
};

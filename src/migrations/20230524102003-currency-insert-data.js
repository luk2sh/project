'use strict';
const fs = require('fs');
const path = require('path');
const sqlData = fs
	.readFileSync(path.join(__dirname, '../common/sql/currencies.sql'))
	.toString();

module.exports = {
	async up(queryInterface, Sequelize) {
		const transaction = await queryInterface.sequelize.transaction();

		try {
			await queryInterface.sequelize.query(sqlData, { transaction });
			await transaction.commit();
		} catch (e) {
			await transaction.rollback();
			throw new Error(e);
		}
	},

	async down(queryInterface, Sequelize) {
		const transaction = await queryInterface.sequelize.transaction();

		try {
			await queryInterface.bulkDelete('Currencies', null, {});
			await transaction.commit();
		} catch (e) {
			await transaction.rollback();
		}
	},
};

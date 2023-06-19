module.exports = {
	async up(queryInterface, Sequelize) {
		const transaction = await queryInterface.sequelize.transaction();
		try {
			const Currencies = await queryInterface.describeTable('Currencies');

			if (Currencies.symbol) {
				await queryInterface.changeColumn(
					'Currencies',
					'symbol',
					{
						type: Sequelize.STRING,
					},
					{ transaction }
				);
			}

			if (Currencies.exchangeRate) {
				await queryInterface.changeColumn(
					'Currencies',
					'exchangeRate',
					{
						type: Sequelize.STRING,
						allowNull: true,
					},
					{ transaction }
				);
			}

			if (Currencies.currencyCode) {
				await queryInterface.removeColumn('Currencies', 'currencyCode', {
					transaction,
				});
			}

			if (Currencies.exchangeRateUpdatedAt) {
				await queryInterface.removeColumn('Currencies', 'exchangeRateUpdatedAt', {
					transaction,
				});

				await queryInterface.addColumn(
					'Currencies',
					'exchangeRateUpdatedAt',
					{
						type: Sequelize.DATE,
						allowNull: true,
					},
					{ transaction }
				);
			}

			await transaction.commit();
		} catch (e) {
			await transaction.rollback();
			throw new Error(e);
		}
	},

	async down(queryInterface, Sequelize) {
		const transaction = await queryInterface.sequelize.transaction();

		try {
			const Currencies = await queryInterface.describeTable('Currencies');
			if (Currencies.symbol) {
				await queryInterface.changeColumn(
					'Currencies',
					'symbol',
					{
						type: Sequelize.INTEGER,
					},
					{ transaction }
				);
			}

			if (!Currencies.exchangeRate) {
				await queryInterface.addColumn(
					'Currencies',
					'exchangeRate',
					{
						type: Sequelize.INTEGER,
						allowNull: true,
					},
					{ transaction }
				);
			}

			if (!Currencies.currencyCode) {
				await queryInterface.addColumn(
					'Currencies',
					'currencyCode',
					{
						type: Sequelize.INTEGER,
					},
					{ transaction }
				);
			}

			if (Currencies.exchangeRateUpdatedAt) {
				await queryInterface.changeColumn(
					'Currencies',
					'exchangeRateUpdatedAt',
					{
						type: Sequelize.STRING,
						allowNull: false,
					},
					{ transaction }
				);
			}
			await transaction.commit();
		} catch (e) {
			await transaction.rollback();
		}
	},
};

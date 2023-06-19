require('dotenv').config();

module.exports = {
	dialect: 'postgres',
	url: process.env.DB_DEV_URL,
};

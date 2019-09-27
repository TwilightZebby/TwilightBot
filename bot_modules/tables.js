const Sequelize = require('sequelize');
const { sequelize } = require('./constants.js');

// >>>>> CREATION OF PINGS TABLE <<<<<
exports.Pings = sequelize.define('pings', {
  // Idenfitication
  userID: {
    type: Sequelize.STRING,
    unique: true,
  },
  username: Sequelize.STRING,
  // Ping counts
	all_ping_count: {
		type: Sequelize.INTEGER,
		defaultValue: 0,
		allowNull: false,
	},
  role_ping_count: {
		type: Sequelize.INTEGER,
		defaultValue: 0,
		allowNull: false,
	},
  user_ping_count: {
		type: Sequelize.INTEGER,
		defaultValue: 0,
		allowNull: false,
	},
  everyone_ping_count: {
		type: Sequelize.INTEGER,
		defaultValue: 0,
		allowNull: false,
	},
  // Placeholder for when I actually code in "Has This User been pinged?"
  been_pinged_count: {
		type: Sequelize.INTEGER,
		defaultValue: 0,
		allowNull: false,
	},
});

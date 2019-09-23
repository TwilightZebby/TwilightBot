/********************
 * Discord.js related
 ********************/

const Discord = require("discord.js"); //Bringing in Discord.js
exports.client = new Discord.Client(); //Creating a simulated client for the Bot to use

/********************
 * Sequelize Related (Databases)
 ********************/

const Sequelize = require('sequelize');
// >>>>> CREATION OF DATABASE <<<<<
exports.sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	operatorsAliases: false,
	// SQLite only
	storage: 'database.sqlite',
});

/********************
 * TP LINK KASA
 ********************/

 const KasaControl = require('kasa_control');
 exports.kasa = new KasaControl();

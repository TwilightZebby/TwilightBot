/********************
 * Discord.js related
 ********************/

const Discord = require("discord.js"); //Bringing in Discord.js
exports.client = new Discord.Client(); //Creating a simulated client for the Bot to use


/********************
 * TP LINK KASA
 ********************/

const KasaControl = require('kasa_control'); // Brings in the TP-Link Kasa stuff from NPM
exports.kasa = new KasaControl(); // Creates a new Kasa Client, ready for use in the /commands/light.js file

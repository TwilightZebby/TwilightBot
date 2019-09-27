// COMMAND FOR CONTROLLING MY SMART LIGHT BULB
const { kasa } = require('../bot_modules/constants.js');
const { PREFIX, KASAEMAIL, KASAPASSWORD, LIGHTID } = require('../config.js');
const Discord = require("discord.js");

module.exports = {
    name: 'light',
    description: 'Control my Smart Light Bulb.\nOnly works on Smart Light is switched on!',
    usage: 'colour|color|c <#hexColourValue>\nbrightness|b <percentage>',
    args: true,
    aliases: ['bulb', 'l'],
    commandType: 'general',
    guildAccess: 'trusted',
    cooldown: 10,
    async execute(message, args) {
      await kasa.login(KASAEMAIL, KASAPASSWORD);
      const request = args.shift();

      // FOR TURNING LIGHT ON
      if(request === 'on') {
        kasa.power(LIGHTID, true)
         .then(status => {
           return message.reply(`Successfully turned on Zebby's light!`);
         })
         .catch(err => console.error(err));
      } else if(request === 'off') {
        kasa.power(LIGHTID, false)
         .then(status => {
          return message.reply(`Successfully turned off Zebby's light!`);
         })
         .catch(err => console.error(err));
      } else if(request === 'colour' || request === 'color' || request === 'c') {
        // Placeholder for now
      }

      // END OF COMMAND
    },
};

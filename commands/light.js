// COMMAND FOR CONTROLLING MY SMART LIGHT BULB
const { kasa } = require('../bot_modules/constants.js');
const { PREFIX, KASAEMAIL, KASAPASSWORD, LIGHTID } = require('../config.js');
const Discord = require("discord.js");

module.exports = {
    name: 'light',
    description: 'Control my Smart Light Bulb.',
    usage: 'colour|color|c <#hexColourValue>\nbrightness|b <percentage>',
    args: true,
    aliases: ['bulb', 'l'],
    commandType: 'general',
    guildAccess: 'private',
    cooldown: 10,
    async execute(message, args) {
      await kasa.login(KASAEMAIL, KASAPASSWORD);
      const request = args.shift();

      // Just in case command is used outside my private Guild
      if(message.author.id != '156482326887530498') {
        return message.reply(`Sorry, but that command can only be used by <@156482326887530498>`)
      }

      // FOR TURNING LIGHT ON
      if(request === 'on') {
        kasa.power(LIGHTID, true)
         .then(status => {
           return message.reply(`Successfully turned on Zebby's light!`);
         })
         .catch(err => console.error(err));
      }
      // FOR TURNING LIGHT OFF
      else if(request === 'off') {
        kasa.power(LIGHTID, false)
         .then(status => {
          return message.reply(`Successfully turned off Zebby's light!`);
         })
         .catch(err => console.error(err));
      }
      // FOR CHANGING LIGHT COLOUR
      // Currently broken
      // Neither 'hue' nor 'saturation' works.
      // 'color_temp' isn't what I want before ye all remind me of that one
      else if(request === 'colour' || request === 'color' || request === 'c') {
        if(args.length != 1) {
          return message.reply(`Hmmm, you seem to be missing the hex colour code!`);
        }

        const colourValue = args.shift();
        kasa.power(LIGHTID, true, { saturation: colourValue } )
         .then(status => {
           return message.reply(`Successfully changed Zebby's light colour to \#${colourValue}`);
         })
         .catch(err => console.error(err));
      }
      // FOR CHANGING LIGHT BRIGHTNESS
      else if(request === 'brightness' || request === 'b') {
        if(args.length != 1) {
          return message.reply(`Hmmm, you seem to be missing the amount of brightness!\nThis should be a value between 1 and 100`);
        }

        var brightnessValue = null;
        try {
          brightnessValue = parseInt(args.shift());
        } catch(err) {
          console.error(err);
          return message.reply(`Hmmm, something went wrong.\nMaybe try \*actually\* using a number?`);
        }

        if(brightnessValue < 1 || brightnessValue > 100) {
          message.reply(`Sorry, but you need to use a value between 1 and 100.`);
        }
        kasa.power(LIGHTID, true, { brightness: brightnessValue } )
         .then(status => {
           return message.reply(`Successfully changed Zebby's light brightness to ${brightnessValue}\%`);
         })
         .catch(err => console.error(err));
      } else {
        return message.reply(`That isn\'t a valid option for this command!`);
      }

      // END OF COMMAND
    },
};

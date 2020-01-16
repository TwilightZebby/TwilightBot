// COMMAND FOR CONTROLLING MY SMART LIGHT BULB
const { kasa } = require('../bot_modules/constants.js');
const { PREFIX, KASAEMAIL, KASAPASSWORD, LIGHTID } = require('../config.js');
const Discord = require("discord.js");

module.exports = {
    name: 'light',
    description: 'Control my Smart Light Bulb.',
    usage: `brightness|b <percentage>\n hue|h <number (0 - 360)>\n saturation|s <number (0 - 100)>\n colour|color|c <colour|list>`,
    args: true,
    aliases: ['bulb', 'l'],
    commandType: 'general',
    guildAccess: 'private',
    cooldown: 10,
    async execute(message, args) {
      await kasa.login(KASAEMAIL, KASAPASSWORD);
      const request = args.shift().toLowerCase();

      // Just in case command is used outside my private Guild
      if(message.author.id != '156482326887530498') {
        return message.reply(`Sorry, but that command can only be used by <@156482326887530498>`)
      }


      // CHECK TO SEE IF LIGHT IS ON
      //     This is to ensure that my friends cannot mess around with my light unless I'm around lol
      //     (See later ELSE IF Statement)
      const bulbInfo = await kasa.info(LIGHTID).catch(error => { return null; });


      // Check to make sure peeps who aren't TwilightZebby use these options
      if (message.member.id === '156482326887530498' && message.guild.id === '264091258035634176' && message.channel.id === '495858908418670592') {
        // FOR TURNING LIGHT ON
        if(request === 'on') {
          await kasa.power(LIGHTID, true)
           .then(status => {
             return message.reply(`Successfully turned on Zebby's light!`);
           })
           .catch(err => console.error(err));
        }
        // FOR TURNING LIGHT OFF
        else if(request === 'off') {
          await kasa.power(LIGHTID, false)
           .then(status => {
            return message.reply(`Successfully turned off Zebby's light!`);
           })
           .catch(err => console.error(err));
        }
        // FOR GRABBING CURRENT INFO ABOUT THE BULB
        else if (request === 'debug') {
          await kasa.info(LIGHTID)
           .then(info => {
             message.reply(`Bulb info has been dumped into the Console.`);
             return console.log(info);
           })
           .catch(error => {
             console.log(error);
             return message.reply(`Sorry, something went wrong!`);
           })
        }
        // EXTRA DEBUGGING OPTION
        else if (request === 'debugall') {
          await kasa.getDevices()
           .then(devices => {
             console.log(devices);
             return message.reply(`Dumped all Devices into Console.`);
           })
           .catch(error => {
             console.error(error);
             return message.reply(`Oops, something went wrong...`);
           });
        }
      }






      else if (bulbInfo === null) {
        return message.reply(`Whack. Something went wrong when connecting to the light bulb.... Please try again later.`);
      } else {

        if (bulbInfo.light_state.on_off === 0) {
          return message.reply(`Sorry, but you cannot use the Light Command unless the Light Bulb is powered on.\n*(It\'s currently powered off)*`);
        }

        // FOR CHANGING LIGHT HUE
        if(request === 'hue' || request === 'h') {
          if(args.length != 1) {
            return message.reply(`Hmmm, you seem to be missing the Hue value!`);
          }

          var hueValue = null;
          // Error Checking
          try {
            hueValue = parseInt(args.shift());
          } catch(err) {
            console.error(err);
            return message.reply(`Hmmm, something went wrong.\nMaybe try \*actually\* using a number?`);
          }
        
          // Ensure value is between 0 - 360
          if (hueValue > 360 || hueValue < 0) {
            return message.reply(`Sorry, but that value wasn't accepted.\nPlease try again using a Hue value between 0 and 360.`);
          }

          await kasa.power(LIGHTID, true, 1, { hue: hueValue } )
           .then(status => {
             return message.reply(`Successfully changed Zebby's light hue to ${hueValue}`);
           })
           .catch(err => console.error(err));
        }





        // FOR CHANGING LIGHT SATURATION
        else if(request === 'saturation' || request === 's') {
          if(args.length != 1) {
            return message.reply(`Hmmm, you seem to be missing the Saturation value!`);
          }

          var satValue = null;
          // Error Checking
          try {
            satValue = parseInt(args.shift());
          } catch(err) {
            console.error(err);
            return message.reply(`Hmmm, something went wrong.\nMaybe try \*actually\* using a number?`);
          }
        
          // Ensure value is between 0 - 360
          if (satValue > 100 || satValue < 0) {
            return message.reply(`Sorry, but that value wasn't accepted.\nPlease try again using a Hue value between 0 and 360.`);
          }

          await kasa.power(LIGHTID, true, 1, { saturation: satValue } )
           .then(status => {
             return message.reply(`Successfully changed Zebby's light saturation to ${satValue}`);
           })
           .catch(err => console.error(err));
        }






        // FOR CHANGING LIGHT COLOUR
        else if(request === 'colour' || request === 'color' || request === 'c') {
          if(args.length != 1) {
            return message.reply(`Hmmm, you seem to be missing the colour name!\nUse \`${PREFIX}light ${request} list\` to see what pre-set colours are available`);
          }

          var colourValue = args.shift().toLowerCase();
          const colourOptions = ['list', 'purple', 'red', 'lime'];
        
          // Ensure value is a pre-set option
          if (!colourOptions.includes(colourValue)) {
            return message.reply(`Sorry, that isn't a pre-set colour option yet!`);
          }

          // LIST
          if (colourValue === 'list') {
            return message.channel.send(`Here is a list of all the pre-set colours:\n
            blue, red, lime`);
          }
          // BLUE
          else if (colourValue === 'purple') {
            await kasa.power(LIGHTID, true, 1, { saturation: 100, hue: 250 } )
           .then(status => {
             return message.reply(`Successfully changed Zebby's light colour to ${colourValue}`);
           })
           .catch(err => console.error(err));
          }
          // RED
          else if (colourValue === 'red') {
            await kasa.power(LIGHTID, true, 1, { saturation: 100, hue: 360 } )
           .then(status => {
             return message.reply(`Successfully changed Zebby's light colour to ${colourValue}`);
           })
           .catch(err => console.error(err));
          }
          // LIME
          else if (colourValue === 'lime') {
            await kasa.power(LIGHTID, true, 1, { saturation: 100, hue: 150 } )
           .then(status => {
             return message.reply(`Successfully changed Zebby's light colour to ${colourValue}`);
           })
           .catch(err => console.error(err));
          }
          // OTHERWISE
          else {
            return message.reply(`Welp, something went wrong. Maybe try again?`);
          }

          /*await kasa.power(LIGHTID, true, 1, { saturation: 100, hue: 250 } )
           .then(status => {
             return message.reply(`Successfully changed Zebby's light colour to ${colourValue}`);
           })
           .catch(err => console.error(err));*/
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
          await kasa.power(LIGHTID, true, 1, { brightness: brightnessValue } )
           .then(status => {
             return message.reply(`Successfully changed Zebby's light brightness to ${brightnessValue}\%`);
           })
           .catch(err => console.error(err));
        } else {
          return message.reply(`That isn\'t a valid option for this command!`);
        }
      }

      // END OF COMMAND
    },
};

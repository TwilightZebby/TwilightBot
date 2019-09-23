const Discord = require("discord.js"); //Bringing in Discord.js
const Sequelize = require('sequelize');
const { sequelize } = require('../bot_modules/constants.js');
const { Pings } = require('../bot_modules/tables.js');
const { PREFIX } = require('../config.js'); //Slapping the PREFIX and token into their own vars

module.exports = {
    name: 'mentions',
    description: 'Shows an overview of the amount of Mentions/Pings you\'ve sent!',
    usage: ' ',
    aliases: ['mention', 'pings'],
    commandType: 'general',
    guildAccess: 'all',
    async execute(message, args) {
      const pingEmbed = new Discord.MessageEmbed().setColor('#0af01d').setFooter('Mention Count Module');
      const mentionCommand = args[0];

      if(!mentionCommand) {
        // *******************
        // FETCH PING COUNT INFO FOR USER
        // *******************

        const ping = await Pings.findOne({ where: { userID: message.author.id } });
        if(ping) {
          pingEmbed.setTitle(`${message.author.username}\'s Mention Count Overview`);
          pingEmbed.setDescription(`Below is a count of the amount of Mentions, or Pings, ${message.author} has sent!`);
          pingEmbed.setThumbnail(message.author.displayAvatarURL());
          pingEmbed.addField(`Total Pings sent:`, `\u200B ${ping.get('all_ping_count')}`);
          pingEmbed.addField(`Role Pings sent:`, `\u200B ${ping.get('role_ping_count')}`);
          pingEmbed.addField(`User Pings sent:`, `\u200B ${ping.get('user_ping_count')}`);
          pingEmbed.addField(`@everyone Pings sent:`, `\u200B ${ping.get('everyone_ping_count')}`);
          //pingEmbed.addField(`Amount of times ${message.author.username} was pinged:`, `\u200B ${ping.get('been_pinged_count')}`);

          return message.channel.send(pingEmbed);
        } else {
          pingEmbed.addField(`Error:`, `Cannot find ${message.author} inside database...\n Please use \`${PREFIX}mentions create\` to force add yourself to the Database if you so wish to.`);

          return message.channel.send(pingEmbed);
        }
      }
      // *******************
      // FORCE ADD USER TO DATABASE
      // *******************
      else if(mentionCommand === 'create') {
        // User is not in Database - add them!
  			try {
  				const ping = await Pings.create({
  					userID: message.author.id,
  					username: message.author.username,
  				});
  				return;
  			} catch(e) {
  				if (e.name === 'SequelizeUniqueConstraintError') {
  					return message.reply(`Oops! Seems like you are already in this Database!`);
  				}
  				return;
  			}
      }
      // *******************
      // ADMIN COMMAND TO RESET USER'S DATABASE ROW
      // *******************
      else if(mentionCommand === 'reset') {
        if(message.author.id != '156482326887530498') {
          return message.reply(`Sorry, but you cannot use that reset command!\nOnly the Bot Developer can use it...`);
        }

        var zeroVar = 0;
        const resetPing = await Pings.update({ all_ping_count: zeroVar, role_ping_count: zeroVar, user_ping_count: zeroVar, everyone_ping_count: zeroVar, been_pinged_count: zeroVar }, { where: { userID: message.author.id } });
        if(resetPing > 0) {
          return message.reply(`Your mentions count has been completely reset back to Zero \(0\)!`);
        } else {
          return message.reply(`Oops! It seems like I couldn\'t reset your mentions count...`);
        }
      }

      // END OF COMMAND
    },
};

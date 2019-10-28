const { PREFIX } = require('../config.js');
const Discord = require("discord.js");

module.exports = {
    name: 'changelog',
    description: 'Shows the changelog for the latest changes to this Bot',
    usage: ' ',
    aliases: ['version', 'update'],
    commandType: 'information',
    guildAccess: 'all',
    execute(message) {
      const updateEmbed = new Discord.MessageEmbed().setColor('#370bb3').setFooter('Changelog');

      updateEmbed.setTitle(`Version 1.8.0`);
      updateEmbed.setDescription(`Released 28th October 2019`);
      updateEmbed.addField(`Added Music Module`, `Because YouTube is blocking the bigger Discord Music Bots\nI do plan on adding support for Spotify!`);
      updateEmbed.addField(`Tweaked Annoy Command`, `Minimum time is now 5 minutes instead of 1, and now pings every 30 seconds instead of every minute.`);

      return message.channel.send(updateEmbed);

      // END OF COMMAND
    },
};

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

      updateEmbed.setTitle(`Version 1.5.2`);
      updateEmbed.setDescription(`Released 9th September 2019`);
      updateEmbed.addField(`Added GuildInfo Command`, `Brings up information about the Guild/Server.`);

      return message.channel.send(updateEmbed);

      // END OF COMMAND
    },
};

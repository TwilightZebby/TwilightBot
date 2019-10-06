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

      updateEmbed.setTitle(`Version 1.7.0`);
      updateEmbed.setDescription(`Released 6th October 2019`);
      updateEmbed.addField(`Changes to all commands`, `All the commands now have a hard-coded check to see what Server they were used in.\nThis is so I can limit some commands to Trusted Servers only!`);
      updateEmbed.addField(`Removed Mentions Command & Module`, `It was broken and I\'m still learning Databases`);

      return message.channel.send(updateEmbed);

      // END OF COMMAND
    },
};

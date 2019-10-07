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

      updateEmbed.setTitle(`Version 1.7.1`);
      updateEmbed.setDescription(`Released 7th October 2019`);
      updateEmbed.addField(`Add more functionality to Light Command`, `It is now possible to change my smart light\'s brightness.\nChanging the colour is still in the works, it\'s a little buggy at the moment...`);

      return message.channel.send(updateEmbed);

      // END OF COMMAND
    },
};

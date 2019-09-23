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

      updateEmbed.setTitle(`Version 1.6.0`);
      updateEmbed.setDescription(`Released 23rd September 2019`);
      updateEmbed.addField(`Added Random Command`, `Randomly selects a random member of the Server!\nDon't worry, this replies using Embeds so the selected User isn\'t pinged!.`);
      updateEmbed.addField(`Added Annoy Command`, `Spam sends Pings to the victim\'s DMs for up to 20 minutes!`);
      updateEmbed.addField(`Added RPS Command`, `Allows you to play Rock Paper Scissors with the Bot!`);
      updateEmbed.addField(`Created a Repo for this Bot on Github!`, `[Click here to view!](https://www.github.com/TwilightZebby/TwilightBot)`);

      return message.channel.send(updateEmbed);

      // END OF COMMAND
    },
};

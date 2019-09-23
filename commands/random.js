const Discord = require("discord.js");

module.exports = {
    name: 'random',
    description: 'Selects a random User!',
    usage: ' ',
    commandType: 'general',
    guildAccess: 'all',
    guildOnly: true,
    cooldown: 3,
    execute(message, args) {
      const randomEmbed = new Discord.MessageEmbed().setColor('#ffffff').setFooter('Random User Selector');

      /***************
       * To grab the User Mention
       ***************/
      function getUserFromMention(mention) {
        const matches = mention.match(/^<@!?(\d+)>$/);
        // The id is the first and only match found by the RegEx.
        // However the first element in the matches array will be the entire mention, not just the ID,
        // so use index 1.
        const id = matches[1];

        return message.client.users.get(id);
      }

      const allGuildMembers = message.guild.members.array();
      const guildMemberCount = allGuildMembers.length;
      const randomMemberInt = Math.floor((Math.random() * guildMemberCount) + 0);
      const randomMember = allGuildMembers[randomMemberInt];

      randomEmbed.addField(`${message.member.displayName} has spun the wheel!`, `....and it landed on ${randomMember}!`);
      return message.channel.send(randomEmbed);

      // END OF COMMAND
    },
};

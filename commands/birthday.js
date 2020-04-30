const Discord = require("discord.js");
const { client } = require('../bot_modules/constants.js');
const { PREFIX } = require('../config.js');

module.exports = {
    name: 'birthday',
    description: 'Grants the mentioned User the Birthday Role for 24 hours',
    usage: '<@user>',
    aliases: ['bd'],
    args: true,
    commandType: 'management',
    guildAccess: 'trusted',
    execute(message, args) {
      
      /***************
       * To grab the User Mention
       ***************/
      function getUserFromMention(mention) {
        const matches = mention.match(/^<@!?(\d+)>$/);
        // The id is the first and only match found by the RegEx.
        // However the first element in the matches array will be the entire mention, not just the ID,
        // so use index 1.
        const id = matches[1];

        return message.guild.members.resolve(id);
      }
      


      // Fetch User
      const chosenUser = getUserFromMention(args[0]);




      // Grab Role in question
      const birthdayRole = message.guild.roles.resolve('286566932629422084');

      // Grant Role
      chosenUser.roles.add(birthdayRole);



      // Announce in chat!
      let broadcastChannel = message.guild.channels.resolve('650250748411641856'); // My testing channel
      // let broadcastChannel = message.guild.channels.resolve('156482432902758400'); // My general channel

      const roleEmbed = new Discord.MessageEmbed().setColor(birthdayRole.hexColor).setFooter(`IT'S ${chosenUser.displayName}'S BIRTHDAY YO`);
      roleEmbed.addField(`It's a Birthday! 🎉`, `Hey, it's ${chosenUser}'s Birthday today!\n\n${chosenUser} - you can use the Role Command to change the name and colour of ${birthdayRole}!\n\nUse \`${PREFIX}help role\` to see how`);

      broadcastChannel.send(roleEmbed);





      // After 24 hours, remove Role and set it back to default values
      client.setTimeout(() => {

        // Set Role back to default values
        birthdayRole.setName(`Birthday Peep`)
        .catch(console.error);

        birthdayRole.setColor('#f0ec0c')
        .catch(console.error);

        // Remove Role from User
        chosenUser.roles.remove(birthdayRole);
        return;

      }, 8.64e+7);





      //END OF COMMAND
    },
};

const { PREFIX } = require('../config.js');
const Discord = require("discord.js");

module.exports = {
    name: 'annoy',
    description: 'Annoy people! **Mwhahahahahahaha!**',
    usage: '@user',
    args: true,
    commandType: 'secret', // Hides from Help Command
    guildAccess: 'trusted',
    cooldown: 60,
    async execute(message, args) {
      // Grab User from mention, then pick a random method of annoyance!

      const annoyEmbed = new Discord.MessageEmbed().setColor('#940404').setFooter('Annoyance Module');
      const guildee = message.guild;
      const messageSender = message.author;

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

      /***************
       * To force WAITING
       * Sourced this function from StackOverflow - I'll have to try and find the URL again!
       ***************/
       function sleep(ms) {
         return new Promise(resolve => setTimeout(resolve, ms));
       }

       /***************
        * Actual Command
        ***************/

      const unluckyUser = getUserFromMention(args[0]); // Grabs the victim
      var annoyanceMethod = 0; // For now, used to see if Victim is safe or not :P
      annoyanceMethod = Math.floor((Math.random() * 10) + 1);
      // Can't remember what I needed these two lines for....
      var annoyLoop = null;
      var annoyLoopInt = 0;

      // VICTIM IS SAFE FROM ANNOYANCE
      if(annoyanceMethod >= 0 && annoyanceMethod <= 3) {
        message.delete(); // To help hide who ran the command :P
        annoyEmbed.addField(`Awh, what a shame!`, `Seems like ${unluckyUser} was lucky this time! Of course, I'm not going to tell them! ;)`);
        return messageSender.send(annoyEmbed);
      } else if(annoyanceMethod >= 4 && annoyanceMethod <= 10) {
        message.delete(); // To help hide who ran the command :P

        // To randomise how long Victim should be pinged for
        // Between 1 and 20 minutes
        var pingAnnoyAmount = 0;
        pingAnnoyAmount = Math.floor((Math.random() * 20) + 1);
        pingAnnoyTime = pingAnnoyAmount * 60000;

        function annoyWithPings() {
          unluckyUser.send(`Here\'s your ping! ${unluckyUser}`);
        }

        annoyEmbed.addField(`You\'ve been cursed!`, `Someone from the **${guildee.name}** Guild has cursed you with ${pingAnnoyAmount} minutes of PINGS!`);
        unluckyUser.send(annoyEmbed);
        unluckyUser.send(`Here\'s your ping! ${unluckyUser}`);

        for (let i = 0; i < pingAnnoyAmount; i++) {
          await sleep(60000);
          annoyWithPings();
        }

        clearInterval(annoyLoop);
        return unluckyUser.send(`The curse has ended, rejoice!`);

      }

      // END OF COMMAND
    },
};

module.exports = {
    name: 'respects',
    description: 'Pay your respects. Can be used with or without a User Mention',
    usage: '<@user>',
    aliases: ['respect', 'r', 'f'],
    commandType: 'general',
    args: true,
    guildAccess: 'all',
    execute(message, args) {
      const argsTest = args[0];
      var mentionTest = 1;
      var peep = null;

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
       * If no arguments
       ***************/

       if(!argsTest) {
         return message.channel.send(`❤ ${message.member} has paid their respects.`);
       } else {
          try {
            peep = getUserFromMention(args[0]);
          } catch(err) {
            console.error(err);
            mentionTest = 0;
          }

          /***************
           * If arguments with User Mention
           ***************/

           if(mentionTest === 1) {
             message.delete();
             return message.channel.send(`❤ ${message.member} has paid their respects to ${peep}`);
           } else if(mentionTest === 0) {
             return message.channel.send(`❤ ${message.member} has paid their respects to ${args.join(' ')}`);
           } else {
             return;
           }

        }

      //END OF COMMAND
    },
};

module.exports = {
    name: 'purge',
    description: 'Purge, or bulk-delete, multiple messages',
    usage: '[Amount of Messages]',
    args: true,
    commandType: 'management',
    guildAccess: 'all',
    guildOnly: true,
    cooldown: 10,
    execute(message, args) {
      if(args[0] > 101) {
        message.reply(`Sorry! I cannot delete more than 100 messages....`);
      } else if(args[0] <= 101 && args[0] >= 1) {
        message.channel.bulkDelete(args[0])
         .catch(err => console.log(err));
      } else if(args[0] < 1) {
        return message.reply(`Sorry! I cannot delete less than 1 message.... 🤔`);
      } else {
        return message.reply(`Oop! Something went wrong.... Are you sure you inputted a whole number?`);
      }
    },
};

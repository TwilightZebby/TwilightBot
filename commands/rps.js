module.exports = {
    name: 'rps',
    description: 'Play Rock Paper Scissors with the Bot!',
    usage: 'rock/paper/scissors',
    aliases: ['rockpaperscissors'],
    commandType: 'fun',
    args: true,
    guildAccess: 'all',
    execute(message, args) {
      // Grab User input
      const usersChoice = args.shift();

      // ROCK
      if(usersChoice === 'rock' || usersChoice === 'r') {
        message.channel.send(`**Rock!**`);
        return message.channel.send(`It ended in a draw!`);
      }
      // PAPER
      else if(usersChoice === 'paper' || usersChoice === 'p') {
        message.channel.send(`**Rock!**`);
        return message.channel.send(`${message.author} won!`);
      }
      // SCISSORS
      else if(usersChoice === 'scissors' || usersChoice === 's') {
        message.channel.send(`**Rock!**`);
        return message.channel.send(`Shame, ${message.author} lost...`);
      }
      // Invaild Input
      else {
        message.channel.send(`**Roc**-- wait, that\'s neither Rock, Paper, nor Scissors....`);
        return message.channel.send(`${message.author} loses by default!`);
      }

      //END OF COMMAND
    },
};

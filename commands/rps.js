const Discord = require("discord.js");

module.exports = {
    name: 'rps',
    description: 'Play Rock Paper Scissors with the Bot!',
    usage: '<rock|r|paper|p|scissors|s>',
    //aliases: ['rockpaperscissors'],
    commandType: 'fun',
    args: true,
    guildAccess: 'all',
    execute(message, args) {
      // Embed time!
      // Embed colour will be set dependant on who wins.
      // Basically: Green = User won. Red = User lose. Pink = Draw!
      // Green: #03fc24
      // Red: #fc0303
      // Pink?: #ae00ff
      const rpsEmbed = new Discord.MessageEmbed().setFooter('Rock Paper Scissors Game');

      // To randomise the Bot's choice
      const rpsArray = ['rock', 'paper', 'scissors'];
      const intRpsChoice = Math.floor((Math.random() * 3) + 0);
      const rpsChoice = rpsArray[intRpsChoice];

      // Grab User input
      const usersChoice = args.shift().toLowerCase();
      const userObject = message.author;

      // User = rock; Bot = rock
      if(usersChoice === 'rock' || usersChoice === 'r' && rpsChoice === 'rock') {
        rpsEmbed.setColor('#ae00ff');
        rpsEmbed.addField(`Rock!`, `Well.....seems like it was a draw.`);
        return message.channel.send(rpsEmbed);
      }
      // User = rock; Bot = Paper
      else if(usersChoice === 'rock' || usersChoice === 'r' && rpsChoice === 'paper') {
        rpsEmbed.setColor('#fc0303');
        rpsEmbed.addField(`Paper!`, `Tough luck. ${userObject} lost!`);
        return message.channel.send(rpsEmbed);
      }
      // User = rock; Bot = scissors
      else if(usersChoice === 'rock' || usersChoice === 'r' && rpsChoice === 'scissors') {
        rpsEmbed.setColor('#03fc24');
        rpsEmbed.addField(`Scissors!`, `Welp, ${userObject} won!`);
        return message.channel.send(rpsEmbed);
      }
      // User = paper; Bot = rock
      else if(usersChoice === 'paper' || usersChoice === 'p' && rpsChoice === 'rock') {
        rpsEmbed.setColor('#03fc24');
        rpsEmbed.addField(`Rock!`, `Welp, ${userObject} won!`);
        return message.channel.send(rpsEmbed);
      }
      // User = paper; Bot = Paper
      else if(usersChoice === 'paper' || usersChoice === 'p' && rpsChoice === 'paper') {
        rpsEmbed.setColor('#ae00ff');
        rpsEmbed.addField(`Paper!`, `Well.....seems like it was a draw.`);
        return message.channel.send(rpsEmbed);
      }
      // User = paper; Bot = scissors
      else if(usersChoice === 'paper' || usersChoice === 'p' && rpsChoice === 'scissors') {
        rpsEmbed.setColor('#fc0303');
        rpsEmbed.addField(`Scissors!`, `Tough luck. ${userObject} lost!`);
        return message.channel.send(rpsEmbed);
      }
      // User = scissors; Bot = rock
      else if(usersChoice === 'scissors' || usersChoice === 's' && rpsChoice === 'rock') {
        rpsEmbed.setColor('#fc0303');
        rpsEmbed.addField(`Rock!`, `Tough luck. ${userObject} lost!`);
        return message.channel.send(rpsEmbed);
      }
      // User = scissors; Bot = Paper
      else if(usersChoice === 'scissors' || usersChoice === 's' && rpsChoice === 'paper') {
        rpsEmbed.setColor('#03fc24');
        rpsEmbed.addField(`Paper!`, `Welp, ${userObject} won!`);
        return message.channel.send(rpsEmbed);
      }
      // User = scissors; Bot = scissors
      else if(usersChoice === 'scissors' || usersChoice === 's' && rpsChoice === 'scissors') {
        rpsEmbed.setColor('#ae00ff');
        rpsEmbed.addField(`Scissors!`, `Well.....seems like it was a draw.`);
        return message.channel.send(rpsEmbed);
      }
      // Otherwise
      else {
        rpsEmbed.setColor('#ae00ff');
        rpsEmbed.addField(`Unexpected Input`, `You can only use "rock", "paper", "scissors", "r", "p", or "s".\nPlease try again using one of these inputs.`);
        return message.channel.send(rpsEmbed);
      }

      // END OF COMMAND
    },
};

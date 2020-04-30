const Discord = require("discord.js");
const { client } = require('../bot_modules/constants.js');

let timerStore = new Map();

module.exports = {
    name: 'countdown',
    description: 'The World\'s Best Countdown Clock Ever (counts in intervals of 2 seconds)',
    usage: '<Seconds>',
    //aliases: [''],
    args: true,
    commandType: 'fun',
    guildAccess: 'all',
    async execute(message, args) {
      
      const countEmbed = new Discord.MessageEmbed().setColor('#09ad32').setFooter('Countdown powered by Dr1fterX');

      // Check if User is not in Map
      let user = timerStore.get(message.author.id);
      if ( !user ) {

        let userConstruct = {
          name: message.member.displayName,
          id: message.author.id,
          timer: null,
          startSecs: 0,
          seconds: 0,
          message: null,
        };
        timerStore.set(message.author.id, userConstruct);

      } else {

        return message.reply(`Sorry, you already have a countdown going!`);

      }
      


      // Now grab the amount of seconds to countdown
      let argSeconds = args.shift();
      try {

        argSeconds = parseInt(argSeconds);

      } catch(error) {

        console.error(error);
        return message.reply(`Sorry, but I don\'t think that was a whole number. Please try again!`);

      }


      // Just so we don't go too high of a countdown lol
      if ( argSeconds > 1000000 ) {
        return message.reply(`Sorry, but the Countdown only supports up to 1 million (1000000) seconds (aka 11 days)`);
      }
      if ( argSeconds < 4 ) {
        return message.reply(`Sorry, the minimum amount of seconds is 4 seconds.`);
      }


      // Now for the actual timer!
      
      user = timerStore.get(message.author.id);
      user.message = await message.channel.send({
        embed: {
          title: `${message.member.displayName}\'s Countdown`,
          color: '#09ad32',
          description: `${argSeconds} seconds remaining...\n(0%)`,
          footer: `Countdown powered by Dr1fterX`,
        }
      });
      user.startSecs = argSeconds;
      user.timer = client.setInterval(() => {
        
        if ( user.seconds === user.startSecs ) {
          
          countEmbed.setTitle(`${message.member.displayName}\'s Countdown`);
          countEmbed.setDescription(`TIMER ENDED`);
          user.message.edit(countEmbed);

          client.clearInterval(user.timer);
          timerStore.delete(message.author.id);
          return;

        }

        user.seconds += 2;

        countEmbed.setTitle(`${message.member.displayName}\'s Countdown`);
        let randomSeconds = Math.floor( ( Math.random() * user.startSecs ) + 0 );

        // Percentages
        let percent = (user.seconds * 100) / user.startSecs;

        if ( percent >= 50 && percent < 85 ) {
          countEmbed.setColor('#e6d307');
        }
        else if ( percent >= 85 ) {
          countEmbed.setColor('#8c0606');
        }

        countEmbed.setDescription(`${randomSeconds} seconds remaining...\n(${percent}\%)`);
        user.message.edit(countEmbed);
        

      }, 2000);



      //END OF COMMAND
    },
};

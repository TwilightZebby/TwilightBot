const Discord = require("discord.js");

module.exports = {
    name: 'role',
    description: `Use to edit the Birthday Role (If you have it)\nUse \`colour list\` to see a full list of pre-set colour options`,
    usage: `name|n <newName>\ncolour|c <#hexCode>|<colourName>|list`,
    aliases: ['r'],
    args: true,
    commandType: 'management',
    guildAccess: 'trusted',
    execute(message, args) {
    
      if (message.guild.id !== '156482432902758400') {
        return message.reply(`Sorry, but this command is limited to one specific server!`);
      }

      const birthdayRole = message.guild.roles.get('286566932629422084');

      // Check Member has the Birthday Role
      if (message.member.roles.highest.id !== '286566932629422084' && message.member.id !== '156482326887530498') {
        return message.reply(`Sorry, but only those with the ${birthdayRole} Role can use this command!`);
      }

      const subCommand = args.shift();

      // CHANGE THE ROLE'S NAME
      if (subCommand === 'name' || subCommand === 'n') {

        const roleOldName = birthdayRole.name;
        
        birthdayRole.setName(args.join(' '))
         .then(updated => {
           return message.channel.send(`Successfully changed the name of the Birthday Role from *${roleOldName}* to **${updated.name}**`);
         })
         .catch(error => {
            console.error(error);
            return message.reply(`Oops, something went wrong when changing the name of the Birthday Role....`);
         })

      }
      // CHANGE THE ROLE'S COLOUR
      else if (subCommand === 'colour' || subCommand === 'c') {

        // Array for storing the pre-set colours
        const colourArray = ['DEFAULT', 'WHITE', 'AQUA', 'GREEN', 'BLUE', 'YELLOW', 'PURPLE', 'GOLD', 'ORANGE', 'RED', 'GREY', 'NAVY', 'DARK_AQUA', 'DARK_GREEN', 'DARK_BLUE', 'DARK_PURPLE', 'DARK_GOLD', 'DARK_ORANGE', 'DARK_RED', 'DARK_GREY', 'LIGHT_GREY', 'DARK_NAVY', 'RANDOM'];
        const roleOldColour = birthdayRole.hexColor;

        // Check for List Option
        if ( args[0] === 'list' ) {
          const roleEmbed = new Discord.MessageEmbed().setColor(birthdayRole.hexColor).setFooter('Birthday Role Management');

          roleEmbed.addField(`List of pre-set colours:`, colourArray.join(`\n`));
          roleEmbed.addField(`Command Guideance`, `Please note, when using a pre-set colour in the command - make sure to type the colour's name **exactly** as it appears *including* the underscore ( _ )`);
          return message.channel.send(roleEmbed);
        }
        // Check if pre-set option
        else if ( colourArray.includes(args[0].toUpperCase()) ) {

          birthdayRole.setColor(args[0].toUpperCase())
           .then(updated => { 
             return message.channel.send(`Successfully updated Birthday Role's colour from *${roleOldColour}* to **${updated.hexColor}**`);
           })
           .catch(error => {
             console.error(error);
             return message.reply(`Whoops, something went wrong when updating the colour of the Birthday Role....`);
           });
        }
        // For hex values
        else {
           
          birthdayRole.setColor(args[0])
           .then(updated => {
             return message.channel.send(`Successfully updated Birthday Role's colour from *${roleOldColour}* to **${updated.hexColor}**`);
           })
           .catch(error => {
             console.error(error);
             return message.reply(`Whoops! Something went wrong when updating the colour of the Birthday Role.\nWhen using Hex Colour Codes, be sure to ***include*** the hash (\#) as well!`);
           });

        }

      }

      //END OF COMMAND
    },
};

//Creating the veraibles needed
const fs = require('fs'); //Node's native file system
const Discord = require("discord.js"); //Bringing in Discord.js
const Sequelize = require('sequelize');
const { client, sequelize } = require('./bot_modules/constants.js');
const { Pings } = require('./bot_modules/tables.js');
const { PREFIX, TOKEN } = require('./config.js'); //Slapping the PREFIX and token into their own vars
client.commands = new Discord.Collection(); //Extends JS's native map class
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js')); //Picks up all the .js files in the commands folder
const cooldowns = new Discord.Collection(); //For Cooldowns to work

for (const file of commandFiles) { //Slaps all the command files into the Collection
    const command = require(`./commands/${file}`);

    // set a new item in the Collection
    // with the key as the command name and the value as the exported module
    client.commands.set(command.name, command);
}

//To make sure the bot is up and running
client.on("ready", () => {
  Pings.sync();
  console.log("I am ready!");
  client.user.setActivity(`${PREFIX}help`); //Sets a Playing Status on the Bot
});
/***********************************************/
/*THE COMMANDS*/
/*Runs whenever a message is sent in a command the Bot has access to*/

client.on("message", async (message) => {

	//Special command code
  //If the msg does NOT start with the PREFIX, OR it was sent by the bot itself - STOP
  if (!message.content.startsWith(PREFIX) || message.author.bot) {
		if (message.author.bot) return; // If message was sent by a Bot, return!
		if (!message.mentions.everyone && !message.mentions.roles.size && !message.mentions.users.size) return; // If NO mentions, return!

		/********************
		 * MENTION COUNT MODULE
		 ********************/

		// Check if User is already in Database or not
		const pings = await Pings.findOne({ where: { userID: message.author.id } });
		if(pings) {
			// Check how many Mentions are in this message AND add that to all_ping_count
			//console.log(message.mentions);
			const everyonePing = message.mentions.everyone;
			const rolePings = message.mentions.roles;
			const userPings = message.mentions.users;
			var pingAmount = 0;
      const oldAllPingAmount = pings.all_ping_count;

			pingAmount += rolePings.size;
			pingAmount += userPings.size;
			if (everyonePing) pingAmount += 1;

      const newAllPingAmount = oldAllPingAmount + pingAmount;

			const allPings = await Pings.update({ all_ping_count: newAllPingAmount }, { where: { userID: message.author.id } });
			if(allPings > 0) {
				// Successful Addition of ALL PINGS

        if(rolePings.size > 0) {
          const oldRolePingAmount = pings.role_ping_count;
          const newRolePingAmount = oldRolePingAmount + rolePings.size;
          const allRolePings = await Pings.update({ role_ping_count: newRolePingAmount }, { where: { userID: message.author.id } });
          if(allRolePings > 0) {
            // Successful Addition of ROLE PINGS

            if(userPings.size > 0) {
              const oldUserPingAmount = pings.user_ping_count;
              const newUserPingAmount = oldUserPingAmount + userPings.size;
              const allUserPings = await Pings.update({ user_ping_count: newUserPingAmount }, { where: { userID: message.author.id } });
              if(allUserPings > 0) {
                // Successful Addition of USER PINGS

                if(everyonePing) {
                  const newEveryonePingAmount = pings.everyone_ping_count + 1;
                  const allEveryonePings = await Pings.update({ everyone_ping_count: newEveryonePingAmount }, { where: { userID: message.author.id } });
                  if(allEveryonePings > 0) {
                    return;
                  }
                  //END OF EVERYONEPING
                } else {
                  return;
                }
              }
              //END OF USERPING
            } else {
              if(everyonePing) {
                const newEveryonePingAmount = pings.everyone_ping_count + 1;
                const allEveryonePings = await Pings.update({ everyone_ping_count: newEveryonePingAmount }, { where: { userID: message.author.id } });
                if(allEveryonePings > 0) {
                  return;
                }
                //END OF EVERYONEPING
              } else {
                return;
              }
            }
          }
          //END OF ROLEPING
        } else {
          if(userPings.size > 0) {
            const oldUserPingAmount = pings.user_ping_count;
            const newUserPingAmount = oldUserPingAmount + userPings.size;
            const allUserPings = await Pings.update({ user_ping_count: newUserPingAmount }, { where: { userID: message.author.id } });
            if(allUserPings > 0) {
              // Successful Addition of USER PINGS

              if(everyonePing) {
                const newEveryonePingAmount = pings.everyone_ping_count + 1;
                const allEveryonePings = await Pings.update({ everyone_ping_count: newEveryonePingAmount }, { where: { userID: message.author.id } });
                if(allEveryonePings > 0) {
                  return;
                }
                //END OF EVERYONEPING
              } else {
                return;
              }
            }
            //END OF USERPING
          } else {
            if(everyonePing) {
              const newEveryonePingAmount = pings.everyone_ping_count + 1;
              const allEveryonePings = await Pings.update({ everyone_ping_count: newEveryonePingAmount }, { where: { userID: message.author.id } });
              if(allEveryonePings > 0) {
                return;
              }
              //END OF EVERYONEPING
            } else {
              return;
            }
          }
        }

			} else {
        if(rolePings.size > 0) {
          const oldRolePingAmount = pings.role_ping_count;
          const newRolePingAmount = oldRolePingAmount + rolePings.size;
          const allRolePings = await Pings.update({ role_ping_count: newRolePingAmount }, { where: { userID: message.author.id } });
          if(allRolePings > 0) {
            // Successful Addition of ROLE PINGS

            if(userPings.size > 0) {
              const oldUserPingAmount = pings.user_ping_count;
              const newUserPingAmount = oldUserPingAmount + userPings.size;
              const allUserPings = await Pings.update({ user_ping_count: newUserPingAmount }, { where: { userID: message.author.id } });
              if(allUserPings > 0) {
                // Successful Addition of USER PINGS

                if(everyonePing) {
                  const newEveryonePingAmount = pings.everyone_ping_count + 1;
                  const allEveryonePings = await Pings.update({ everyone_ping_count: newEveryonePingAmount }, { where: { userID: message.author.id } });
                  if(allEveryonePings > 0) {
                    return;
                  }
                  //END OF EVERYONEPING
                } else {
                  return;
                }
              }
              //END OF USERPING
            } else {
              if(everyonePing) {
                const newEveryonePingAmount = pings.everyone_ping_count + 1;
                const allEveryonePings = await Pings.update({ everyone_ping_count: newEveryonePingAmount }, { where: { userID: message.author.id } });
                if(allEveryonePings > 0) {
                  return;
                }
                //END OF EVERYONEPING
              } else {
                return;
              }
            }
          }
          //END OF ROLEPING
        } else {
          if(userPings.size > 0) {
            const oldUserPingAmount = pings.user_ping_count;
            const newUserPingAmount = oldUserPingAmount + userPings.size;
            const allUserPings = await Pings.update({ user_ping_count: newUserPingAmount }, { where: { userID: message.author.id } });
            if(allUserPings > 0) {
              // Successful Addition of USER PINGS

              if(everyonePing) {
                const newEveryonePingAmount = pings.everyone_ping_count + 1;
                const allEveryonePings = await Pings.update({ everyone_ping_count: newEveryonePingAmount }, { where: { userID: message.author.id } });
                if(allEveryonePings > 0) {
                  return;
                }
                //END OF EVERYONEPING
              } else {
                return;
              }
            }
            //END OF USERPING
          } else {
            if(everyonePing) {
              const newEveryonePingAmount = pings.everyone_ping_count + 1;
              const allEveryonePings = await Pings.update({ everyone_ping_count: newEveryonePingAmount }, { where: { userID: message.author.id } });
              if(allEveryonePings > 0) {
                return;
              }
              //END OF EVERYONEPING
            } else {
              return;
            }
          }
        }
        //END OF ALLPING
			}

		} else {
			// User is not in Database - add them!
			try {
				const ping = await Pings.create({
					userID: message.author.id,
					username: message.author.username,
				});
				return;
			} catch(e) {
				if (e.name === 'SequelizeUniqueConstraintError') {
					return console.log(`User ${message.author.username} already exists in this Database! User ID: ${message.author.id}`);
				}
				return;
			}
			// END OF IF PING
		}
		// END OF IF MESSAGE != PREFIX
	};


  //Slides the PREFIX off the command
  const args = message.content.slice(PREFIX.length).split(/ +/);
  //Slaps the cmd into its own var
  const commandName = args.shift().toLowerCase();
  //If there is NOT a command with the given name or aliases, exit early
  const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
  if (!command) return;

  //COOLDOWNS
  //If a command has 'cooldown: x,' it will enable cooldown IN SECONDS
  if (!cooldowns.has(command.name)) {
     cooldowns.set(command.name, new Discord.Collection());
   }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 1) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
    }
   } else {
     timestamps.set(message.author.id, now);
     setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
   }

  //A check for if the user ran a command inside DMs
  //if a cmd has 'guildOnly: true,', it won't work in DMs
  if (command.guildOnly && message.channel.type !== 'text') {
    return message.reply('I can\'t execute that command inside DMs!');
  }

  //A check for if the user ran a command inside Guilds
  //if a cmd has 'dmOnly: true,', it won't work in Guilds
  if (command.dmOnly && message.channel.type !== 'dm') {
    return message.reply('I can\'t execute that command inside Guilds!')
  }

  //A check for missing parameters
  //If a cmd has 'args: true,', it will throw the error
  //Requires the cmd file to have 'usage: '<user> <role>',' or similar
  if (command.args && !args.length) {
    let reply = `You didn't provide any arguments, ${message.author}!`;
      if (command.usage) {
        reply += `\nThe proper usage would be: \`${PREFIX}${command.name} ${command.usage}\``;
      }
      return message.channel.send(reply);
  }

  //If there is, grab and run that command's execute() function
  try {
    command.execute(message, args);
  } //Any errors are caught here, and thrown back at the User and Console
  catch (error) {
    console.error(error);
    message.reply('There was an error trying to execute that command!');
  }
  //Extra Error Catching
  process.on('unhandledRejection', error => console.error('Uncaught Promise Rejection', error));

  /******************************************************/

});

/***********************************************/
//The token to connect the bot to the Bot Account on Discord
client.login(TOKEN);

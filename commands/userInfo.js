const { PREFIX } = require('../config.js');
const Discord = require("discord.js");

module.exports = {
    name: 'userinfo',
    description: 'Shows information about a mentioned User.',
    usage: '@user',
    args: true,
    aliases: ['user', 'ui', 'u'],
    commandType: 'information',
    guildAccess: 'all',
    execute(message, args) {
      const userEmbed = new Discord.MessageEmbed().setColor('#9e139e').setFooter('User Information Module');

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

      if(!args.length) {
        userEmbed.addField(`Error: Missing Argument`, `You need to include a User Mention/Ping. \nExample: \`${PREFIX}userinfo @user\``);

        return message.channel.send(userEmbed);
      } else {
        const chosenUser = getUserFromMention(args[0]);
        const cUserAvatar = chosenUser.displayAvatarURL();
        const cUserName = chosenUser.username;
        const cUserBot = chosenUser.bot;
        const cUserPresence = chosenUser.presence.status;
        const cUserCreationDate = chosenUser.createdAt.toDateString();
        const cUserMember = message.guild.member(chosenUser);

        // Start with placeholders
        var cUserRoles = null;
        var cUserJoinedGuild = null;
        var cUserGuildName = null;
        var cUserNotablePermissions = null;
        // Thing for assigning above values
        if(cUserMember) {
          cUserRoles = cUserMember.roles.array();
          cUserJoinedGuild = cUserMember.joinedAt.toDateString();
          guildName = message.guild.name;

          // Check notable permissions
          if (cUserMember.hasPermission('ADMINISTRATOR', { checkAdmin: true, checkOwner: false })) {
            cUserNotablePermissions = "Has **Admin** Permission";
          }
          if (cUserMember.hasPermission('KICK_MEMBERS', { checkAdmin: false, checkOwner: false })) {
            cUserNotablePermissions += `Has **Kick Members** Permission\n`;
          }
          if (cUserMember.hasPermission('BAN_MEMBERS', { checkAdmin: false, checkOwner: false })) {
            cUserNotablePermissions += `Has **Ban Members** Permission\n`;
          }
          if (cUserMember.hasPermission('MANAGE_GUILD', { checkAdmin: false, checkOwner: false })) {
            cUserNotablePermissions += `Has **Manage Server** Permission\n`;
          }
          if (cUserMember.hasPermission('PRIORITY_SPEAKER', { checkAdmin: false, checkOwner: false })) {
            cUserNotablePermissions += `Has **Priority Speaker** Permission (for Push-to-Talk Voice Channels)\n`;
          }
          if (cUserMember.hasPermission('MANAGE_MESSAGES', { checkAdmin: false, checkOwner: false })) {
            cUserNotablePermissions += `Has **Manage Messages** Permission\n`;
          }
          if (cUserMember.hasPermission('MENTION_EVERYONE', { checkAdmin: false, checkOwner: false })) {
            cUserNotablePermissions += `Has **Mention Everyone** Permission (Can use \`@everyone\` and \`@here\`)\n`;
          }
          if (cUserMember.hasPermission('MANAGE_ROLES', { checkAdmin: false, checkOwner: false })) {
            cUserNotablePermissions += `Has **Manage Roles** Permission\n`;
          }
        }

        // For checking if Guild Owner or not
        const guildOwner = message.guild.ownerID;
        var cUserIsOwner = false;
        if(guildOwner === chosenUser.id) {
          cUserIsOwner = true;
          cUserNotablePermissions = null;
        }

        // Extra catch to get rid of the "Null" in cUserNotablePermissions
        if (cUserNotablePermissions !== null) {
          cUserNotablePermissions = cUserNotablePermissions.slice(4);
        }

        // EMBED TIME
        userEmbed.setAuthor(cUserName, cUserAvatar);
        userEmbed.setThumbnail(cUserAvatar);
        userEmbed.setDescription(`${chosenUser}`);
        userEmbed.addField(`Is a Bot?`, `${cUserBot}`, true);
        userEmbed.addField(`Status`, `${cUserPresence}`, true);
        userEmbed.addField(`Date ${cUserName} created account`, `${cUserCreationDate}`);
        if(cUserJoinedGuild !== null) { userEmbed.addField(`Date ${cUserName} joined ${guildName}`, `${cUserJoinedGuild}`); }
        if(cUserRoles !== null) { userEmbed.addField(`Roles ${cUserName} has:`, `${cUserRoles.join(' ')}`); }
        if(cUserIsOwner === true) { userEmbed.addField(`Other Information`, `Is Server Owner`); }
        if(cUserNotablePermissions !== null) { userEmbed.addField(`Notable Server Permissions:`, cUserNotablePermissions); }

        return message.channel.send(userEmbed);
      }

      // END OF COMMAND
    },
};

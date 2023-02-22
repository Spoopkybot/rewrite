const BaseCommand = require("../../BaseClasses/BaseCommand");
const Guild = require("../../database/models/modelG");
const ms = require("ms")

module.exports = class Mute extends BaseCommand {
    constructor() {
        super({
            aliases: ["silence"],
            description: "Mute a user",
            name: "mute",
            permissions: ["MANAGE_ROLES"],
            usage: "mute ( user )",
            category: "moderation",
            ids: [],
        });
    }



    async run(client, message, args) {
        if(!message.guild.me.hasPermission("MANAGE_ROLES")) return message.reply("I don't have the required permissions, \`MANAGE_ROLES\`");
        //if(!message.member.hasPermission("KICK_MEMBERS")) return message.reply("You don't have the required permissions, \`MANAGE_ROLES\`");
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!member) return message.channel.send("Please mention a valid member");

        let guild = await Guild.findOne({ guildId: message.guild.id });
        if (!guild) guild = await Guild.create({ guildId: message.guild.id });

        let muteRole = message.guild.roles.cache.find(r => r.name === "Muted");

        if (!muteRole) {
            muteRole = await message.guild.roles.create({
                data: {
                    name: "Muted",
                    color: "#000000",
                    permissions: [],
                }
            });
        }

        guild.muteRole = muteRole.id;

        
        guild.mutedUsers.push({
            uId: member.id,
            oldRoles: member.roles.cache.map(r => r.id),
        });

        for (const role of member.roles.cache.array().filter(r => r.id !== message.guild.id)) {
            member.roles.remove(role.id);
        }

        member.roles.add(muteRole.id);


        try {
            await guild.updateOne(guild);
        } catch (err) {
            return message.channel.send("Something went wrong while updating the database.");
        }


        return message.channel.send(`${member.user.tag} was successfully muted`);


    }

}
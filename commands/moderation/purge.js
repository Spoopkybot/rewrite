const BaseCommand = require("../../BaseClasses/BaseCommand.js");
const { MessageEmbed } = require("discord.js")
module.exports = class Purge extends BaseCommand {
    constructor() {
        super({
            name: "purge",
            aliases: ["clear"],
            description: "Mass delete messages",
            usage: "purge 99",
            permissions: ["MANAGE_MESSAGES"],
            category: "moderation",
            ids: [],
        });
    }
    async run (client, message, args) {
        if(!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.reply("I don't have the required permission. \`MANAGE_MESSAGES\`").then(msg => msg.delete({timeout: 3000}));
        //if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You lack the required permission. \`MANAGE_MESSAGES\`").then(msg => msg.delete({timeout: 3000}));
        if(!args[0]) return message.reply(`Enter a number from 1 - 100`).then(msg => msg.delete({timeout: 3000}));
        if(args[0] > 100) return message.reply(`Enter a number from 1 - 100`).then(msg => msg.delete({timeout: 3000}));
        message.delete();
        let Replyembed = new MessageEmbed()
            .setAuthor(message.author.name, message.author.displayAvatarURL({dynamic:true}))
            .setDescription(`Successfully purged ${args[0]} messages from <#${message.channel.id}>`)
        message.channel.bulkDelete(parseInt(args[0])).then(() => {
            message.channel.send(Replyembed).then(msg => msg.delete({timeout: 3000}));
        }).catch((err) => {
            return message.reply(`An error has occurred ${err}`).then(msg => msg.delete({timeout: 3000}));
        })
    
    }
}
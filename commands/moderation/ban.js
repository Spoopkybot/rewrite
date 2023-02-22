const BaseCommand = require("../../BaseClasses/BaseCommand.js");
const { MessageEmbed } = require("discord.js")
module.exports = class Ban extends BaseCommand {
    constructor() {
        super({
            name: "ban",
            aliases: [],
            description: "ban members",
            usage: "ban ( user ) [ user2 ] [] = optional",
            permissions: ["BAN_MEMBERS"],
            category: "moderation",
            ids: [],
        });
    }
    async run (client, message, args) {
        if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.reply("I don't have the required permission. \`BAN_MEMBERS\`").then(msg => msg.delete({timeout: 3000}));
        //if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You lack the required permission. \`BAN_MEMBERS\`").then(msg => msg.delete({timeout: 3000}));
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args.join(' ').toLocaleLowerCase())
        if(!user) message.delete(); message.reply(`Input a valid user!`).then(msg => msg.delete({timeout: 5000}));
        if(!user.bannable) { return message.reply(`I cannot ban this user, due to higher rank`)}
        if(user.hasPermission("BAN_MEMBERS", {checkAdmin:true, checkOwner:true})) return message.reply(":x: You cannot ban admins or mods :x:");
        let reason = args.slice(2).join(" ")
        if(!reason) { reason = "Unspecified" }
        if(user.bannable) {
            const a = new MessageEmbed()
                .setAuthor(`${user} has been banned by ${message.author.tag} (message.author.id) for ${reason} \n\n ${message.createdAt()}`)
            await message.channel.send(a)
            //message.channel.send(`${user} has been banned by ${message.author.tag} (${message.author.id}) for ${reason} \n\n ${message.createdAt}`)
            await user.ban(reason).catch((err) => {
                console.log(err);
            })
        }
    
    }
}
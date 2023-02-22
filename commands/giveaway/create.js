const BaseCommand = require("../../BaseClasses/BaseCommand.js");
const { MessageEmbed } = require("discord.js")
const ms = require("ms")
module.exports = class Giveaway extends BaseCommand {
    constructor() {
        super({
            name: "start",
            aliases: [],
            description: "start a giveaway",
            usage: "start < channel > < time > < item >  || == optional",
            permissions: ["MANAGE_GUILD"],
            category: "general",
            ids: [],
        });
    }
    async run (client, message, args) {

        const channel = message.mentions.channels.first() || message.guild.cache.get(args[0])
        if(!channel) return message.reply(`You have not inputted a valid channel!`)
        if(!args[1] || Math.floor(args[1])) return message.reply(`Input a valid time`)

    }
}
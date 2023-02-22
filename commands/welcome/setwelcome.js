const BaseCommand = require("../../BaseClasses/BaseCommand.js");
const { MessageEmbed } = require("discord.js");

const welcomeM = require("../../database/models/modelG");
module.exports = class Ping extends BaseCommand {
    constructor() {
        super({
            name: "welcome",
            aliases: [],
            description: "Set the welcome channel",
            usage: "welcome #channel",
            permissions: ["SEND_MESSAGES"],
            category: "general",
            ids: [],
        });
    }
    async run (client, message, args) {
        let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0])
        let wel = await welcomeM.findOne({ guildId: message.guild.id });
        if (!wel) wel = await Guild.create({ guildId: message.guild.id, welcome: channel.id});
        try { 
            await wel.updateOne(wel)
        } catch(e) {
            return message.channel.send(`An unexpected error has occured!`)
        }
    }
}
const BaseCommand = require("../../BaseClasses/BaseCommand.js");
const { MessageEmbed } = require("discord.js")
module.exports = class Ping extends BaseCommand {
    constructor() {
        super({
            name: "ping",
            aliases: ["latency"],
            description: "Get the bot's ping",
            usage: "ping",
            permissions: ["SEND_MESSAGES"],
            category: "general",
            ids: [],
        });
    }
    async run (client, message, args) {
        message.channel.send(`Pinging....`).then((msg) => {
            const _ = new MessageEmbed()
              .setAuthor(
                `\nLatency is ${Math.floor(
                  msg.createdTimestamp - message.createdTimestamp
                )}ms\nAPI Latency is ${Math.round(client.ws.ping)}ms `,message.author.displayAvatarURL({dynamic: true})
              )
            msg.edit(_);
            msg.edit("\u200B");
          });
    }
}
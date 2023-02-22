const config = require("../config/config.json");
const BaseEvent = require("../BaseClasses/BaseEvent.js");
module.exports = class Ready extends BaseEvent {
    constructor() {
        super("message");
    }
    async run(client, message) {
	let channel_id = "810319415010525184"
	const reactionEmojis = ["👍", "👎"];
	if(message.channel.id == channel_id && !message.author.bot) { await reactionEmojis.forEach(async emoji => await message.react(emoji)) }
    if(message.author.bot || message.channel.type == "dm") return;
    const args = message.content.slice(config.prefix.length).split(" ");
    const command = args.shift();

    const commandfile = client.commands.get(command) || client.commands.get(client.aliases.get(command));

    
    if(commandfile) {
        const permissions = commandfile.permissions;
        const ids = commandfile.ids;
        for (const permission of permissions) {
            if (!message.member.permissions.has(permission)) return message.channel.send(`You lack the required permission. \`${permission}\``);
        }
        if(commandfile.ids) {
        for(const id of ids) {
            if (!message.author.id.includes(id)) return message.channel.send("You're not the bot owner")
        }
    }
        commandfile.run(client, message, args)
    }
    }
}
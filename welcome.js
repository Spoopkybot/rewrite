const db = require("quick.db");
module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_GUILD")) return;
let message = args.join(" ")
if(!message) { return message.reply(`Enter a welcome message`) }
if(message) {
    db.set(`welcomemsg_${message.guild.id}`, args[0])
}
}

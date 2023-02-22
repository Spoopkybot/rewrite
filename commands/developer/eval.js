const BaseCommand = require("../../BaseClasses/BaseCommand.js");
const Discord = require("discord.js"),
      { post } = require("node-superfetch");
module.exports = class Eval extends BaseCommand {
    constructor() {
        super({
            name: "eval",
            aliases: ["e"],
            description: "run javascript",
            usage: "NONE",
            permissions: [],
            category: "developer",
            ids: ["230542036137279490"],
        });
    }
    async run (client, message, args) {
        const embed = new Discord.MessageEmbed()
.addField("Input", "```js\n" + args.join(" ") + "```");


try {
  const code = args.join(" ");
  if (!code) return message.channel.send("Please include the code.");
  let evaled;

  if (code.includes(`SECRET`) || code.includes(`TOKEN`) || code.includes("process.env") || code.includes(`token`)) {
    evaled = "NzMwNTY0NDcxMTAxMzI1MzM1.XwZVLw.7Gnrw5hKgRNPiSmBivCrodgU5ms";
  } else {
    evaled = eval(code);
  }
  
  if (typeof evaled !== "string") evaled = require("util").inspect(evaled, {depth: 0});
  let output = (evaled);
  if (output.length > 1024) {

    const {body} = await post("https://hastebin.com/documents").send(output);
    embed.addField("Output", `https://hastebin.com/${body.key}.js`).setColor(0x7289DA);


  } else {
    embed.addField("Output", "```js\n" + output + "```").setColor(0x7289DA)

  }
  
  message.channel.send(embed);
  
} catch (error) {
  let err = (error);
  if (err.length > 1024) {

    const {body} = await post("https://hastebin.com/documents").send(err);
    embed.addField("Output", `https://hastebin.com/${body.key}.js`).setColor("RED");
  } else {
    embed.addField("Output", "```js\n" + err + "```").setColor("RED");
  }
  
  message.channel.send(embed);
}
}
}
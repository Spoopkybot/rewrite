const Discord = require("discord.js");
const client = new Discord.Client({
    ws: {
        intents: Discord.Intents.ALL
    },
});
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

const categories = require("./utils/categories");

const config = require("./config/config.json");

const LoadCommands = require("./Loaders/loadcommands.js");
const loadCommands = new LoadCommands("commands", ["./general", "./moderation", "./developer"], client);
loadCommands.init();

const loadEvents = require("./Loaders/eventloader.js")
const LoadEvents = new loadEvents("./events", client)
LoadEvents.init()

client.login(config.token)
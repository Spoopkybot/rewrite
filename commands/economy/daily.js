const BaseCommand = require("../../BaseClasses/BaseCommand.js");
const { MessageEmbed } = require("discord.js")
const mongoose = require("mongoose")
const config = require("../../config/config.json")
const ms = require("ms")
mongoose.connect(config.mongo, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const Data = require("../../database/models/data.js")
module.exports = class Daily extends BaseCommand {
    constructor() {
        super({
            name: "daily",
            aliases: [],
            description: "collect your daily reward",
            usage: "daily",
            permissions: ["SEND_MESSAGES"],
            category: "economy",
            ids: [],
        });
    }
    async run (client, message, args) {
     let timeout = 84000000;
     let reward = Math.floor(Math.random() * 500) + 1
        let user = message.mentions.members.first() || client.users.cache.get(args[0])
        if(!user) {
            user = message.member
        }

        Data.findOne({
            userID: user.id,
        }, (err, data) => {
            if(err) console.log(err);
            if(!data) {
                const newData = new Data({
                    name: client.users.cache.get(user.id).username,
                    userID: user.id,
                    lb: "all",
                    money: reward,
                    daily: timeout,
                    work: 0,
                    bank: 0,
                    weekly: 0,
                })
                newData.save().catch(err => console.log(err));
                let embed = new MessageEmbed()
                .setTitle("Daily Reward")
                .setDescription(`${message.author.username} has claimed the daily reward of ${reward}`)
                message.channel.send(embed)
            } else {
                let embed = new MessageEmbed()
                .setTitle("Daily Reward")
                if(timeout - (Date.now() - data.daily) > 0) {
                    let time = ms(timeout - (Date.now() - data.daily));
    
                    embed.setColor("ff0000");
                    embed.setDescription(`**You have already claimed your daily reward**`);
                    embed.addField(`Use command again in`, `**${time.hours}h ${time.minutes}m ${time.seconds}s**`);
                    return message.channel.send(embed);
                } else {
                data.money += reward;
                data.daily = Date.now();
                data.save().catch(err => console.log(err));
                embed.setDescription(`${client.users.cache.get(user.id).username} has claimed ${reward} for their daily reward. Current Balance ${data.money.toLocaleString()}`)
                return message.channel.send(embed);
            }
        }
        })
    }
}
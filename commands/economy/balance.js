const BaseCommand = require("../../BaseClasses/BaseCommand.js");
const { MessageEmbed } = require("discord.js")
const mongoose = require("mongoose")
const config = require("../../config/config.json")
mongoose.connect(config.mongo, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const Data = require("../../database/models/data.js")
module.exports = class Balance extends BaseCommand {
    constructor() {
        super({
            name: "balance",
            aliases: ["bal","money"],
            description: "find out someone's money or yours",
            usage: "bal || bal ( user )",
            permissions: ["SEND_MESSAGES"],
            category: "economy",
            ids: []
        });
    }
    async run (client, message, args) {
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
                    money: 0,
                    daily: 0,
                    work: 0,
                    bank: 0,
                    weekly: 0,
                })
                newData.save().catch(err => console.log(err));
                let embed = new MessageEmbed()
                .addFields(
                    {name:`**Bal:**`, value: `0 Credits`},
                    {name: `**Bank:**`, value: `0 Credits`},
                    {name: `**Total:**`, value: `0 Credits`}
        
        
                    )
                message.channel.send(embed)
            } else {
                let a = data.money
                let b = data.bank
                let c = a + b
                let embed = new MessageEmbed()
                .setTitle("Account")
                .addFields(
                {name:`**Bal:**`, value: `${data.money.toLocaleString()} Credits`},//,
                {name: `**Bank:**`, value: `${data.bank.toLocaleString()} Credits`},
                {name: `Total`, value: `${c.toLocaleString()} Credits`}
    
    
                )
    
                message.channel.send(embed)
            }
        })
    }
}
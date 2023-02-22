const { ReactionUserManager } = require("discord.js");
const BaseEvent = require("../BaseClasses/BaseEvent");
const Stats = require("../database/models/stats");

module.exports = class GuildMemberRemove extends BaseEvent {
    constructor() {
        super("guildMemberRemove");
    }

    async run(client, member) {
        let stats = await Stats.findOne({ guildId: member.guild.id });
        if (!stats) return;
        

    }

}
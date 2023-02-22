const { ReactionUserManager } = require("discord.js");

const BaseEvent = require("../BaseClasses/BaseEvent.js");
module.exports = class Ready extends BaseEvent {
    constructor() {
        super("ready");
    }
    async run(client) {
        console.log(`${client.user.tag} is ready`)
    }
}
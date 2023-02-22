const BaseCommand = require("../../BaseClasses/BaseCommand");
const stats = require("../../database/models/stats")
module.exports = class setup extends BaseCommand {
    constructor() {
        super({
            name: "setup",
            aliases: [],
            description: "Setup server stats",
            usage: "setup",
            permissions: ['SEND_MESSAGES', "MANAGE_CHANNELS", 'VIEW_CHANNELS'],
            category: "stats",
            ids: []
        });
    }
}
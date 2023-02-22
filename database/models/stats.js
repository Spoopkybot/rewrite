const { Schema, model } = require("mongoose");

const stats = new Schema({

    guildId: {type: String, required: true},
    active: { type: Boolean, reguired: true, default: false},
    category: { type: String, required: true},

});

module.exports = model("stats", stats);
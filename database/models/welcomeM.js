const { Schema, model } = require("mongoose");

const welcomeM = new Schema({

    guildId: {type: String, required: true},
    active: { type: Boolean, required: true, default: false}

});

module.exports = model("welcomeM", welcomeM);
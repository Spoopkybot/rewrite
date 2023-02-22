const { Schema, model } = require("mongoose");

const Guild = new Schema({

    guildId: {type: String, required: true},
    mutedUsers: {type: Array, required: true, default: []},
    muteRole: { type: String, required: false, default: "" },

});

module.exports = model("modelG", Guild);
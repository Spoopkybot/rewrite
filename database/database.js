const mongoose = require("mongoose");
const { mongo } = require("../config/config.json")

mongoose.connect(mongo, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false }, (err) => {
    if (err) throw err;
    console.log("Successfully connected to the MongoDB database.");
});
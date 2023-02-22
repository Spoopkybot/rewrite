const { Schema, model } = require("mongoose");
module.exports = model(
  "data",
  new Schema({
    name: String,
    userID: String,
    lb: String,
    money: Number,
    daily: Number,
    work: Number,
    bank: Number,
    weekly: Number,
  })
);
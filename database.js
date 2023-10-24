const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  user: String,
  message: String,
  correctedMessage: String,
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
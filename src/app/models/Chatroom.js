const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    romId: { type: String, require: true },
    senderEmail: { type: String, require: true },
    reciverEmail: { type: String, require: true },
    txtMsg: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChatSchema = new Schema(
  { 
    time:{type:String,default:Date.now},
    roomID: { type: String, require: true },
    senderEmail: { type: String, require: true },
    recieverEmail: { type: String, require: true },
  }
);


module.exports = Chats =mongoose.model("chats", ChatSchema);

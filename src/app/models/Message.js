const mongoose = require ('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug)

const MessageSchema = new Schema (
  {
    group:{
      type:mongoose.Schema.Types.ObjectId,
      require :"Chatroom is required",
      ref:"Group" ,
    },
    user:{
      type:mongoose.Schema.Types.ObjectId,
      require :"Chatroom is required",
      ref:"User" ,
    },
    message:{
      type:String,
      require :"Message is required",
    }
  }
);
module.exports = mongoose.model ('Message', MessageSchema);
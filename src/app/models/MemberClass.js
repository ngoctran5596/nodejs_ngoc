const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const Member = new Schema(
  { 
    couresId:{type: mongoose.Schema.Types.ObjectId, ref:"User"},
    userId: { type: mongoose.Schema.Types.ObjectId, ref:"User"},
    postId: {type: mongoose.Schema.Types.ObjectId,ref:"Post"},
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("members", Member);

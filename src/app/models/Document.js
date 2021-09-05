const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const Document = new Schema(
  {
    description: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref:"User"  },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref:"courses"},
    
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("documents", Document);

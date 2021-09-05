const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const Course = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref:"User"  },
    courseType: { type: String},
    studentId: [{type: mongoose.Schema.Types.ObjectId,ref:"User"}],
    // newfeedId: [{type: mongoose.Schema.Types.ObjectId,ref:"User"}]
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("courses", Course);

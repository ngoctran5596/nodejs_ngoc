const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const City = new Schema(
  {
    name: { type: String, required: true },
    code: { type: String , required: true },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("city", City);

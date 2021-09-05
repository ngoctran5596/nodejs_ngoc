const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-generator");
mongoose.plugin(slug);

const Note = new Schema(
  {
    description: { type: String },
    userId: { type:String },
    idYoutube: { type: String},
    nameClass: { type: String},
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("notes", Note);

const mongoose = require ('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug)

const UserSchema = new Schema (
  {
    name: {type: String},
    email: {type: String,required: true},
    password: {type: String,required: true},
    image: {type: String},
    isTurtor: { type: String,  required: true},
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model ('User', UserSchema);
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-generator");
mongoose.plugin(slug);

const Course = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    image: { type: String ,required: true},
    videoId: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    courseType: { type: mongoose.Schema.Types.ObjectId, required: true },
    slug: { type: String, slug: "name", unique: true },
    level: { type: String },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Course", Course);

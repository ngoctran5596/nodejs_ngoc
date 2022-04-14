const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const CourseLearning = new Schema(
  {
    title: { type: String },
    instructor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    videos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    discussions: { type: mongoose.Schema.Types.ObjectId, ref: "Discussions" },
    duration: { type: String },
    ratings: { type: Number },
    price: { type: String },
    is_favorite:  [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    thumbnail: { type: String }
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("courseLearning", CourseLearning);

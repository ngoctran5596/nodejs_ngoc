const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CourseType = new Schema(
    {
      title: { type: String, required: true },
      thumbnail: { type: String ,default:'https://learn-code-easy.herokuapp.com/imageNewFeed/Learn_Code.png'},
    },
    {
      timestamps: true,
    }
  );
  module.exports = mongoose.model("CourseTypeLearning", CourseType);
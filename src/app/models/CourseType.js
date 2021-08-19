const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CourseType = new Schema(
    {
      name: { type: String, required: true },
      description: { type: String },
      image: { type: String ,default:'https://learn-code-easy.herokuapp.com/imageNewFeed/Learn_Code.png'},
    },
    {
      timestamps: true,
    }
  );
  module.exports = mongoose.model("CourseType", CourseType);
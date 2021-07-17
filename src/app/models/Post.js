const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-generator");
mongoose.plugin(slug);

const Post = new Schema(
  {
    description: { type: String },
    image: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref:"User"  },
    comment: [{type: mongoose.Schema.Types.ObjectId,ref:"Comment"}],
    like: [{type: mongoose.Schema.Types.ObjectId,ref:"Like"}],
    typeClassId: { type: mongoose.Schema.Types.ObjectId, ref:"CourseType"},
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Post", Post);

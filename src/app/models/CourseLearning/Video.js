const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Video = new Schema(
  {
    title: { type: String },
    duration: { type: String },
    course_id:{ type: mongoose.Schema.Types.ObjectId, ref: "courseLearning" },
    size: { type: Number },
    source: { type: String },
    progress: { type: String },
    is_playing: [{ type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    is_complete:  [{ type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    is_lock:  [{ type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    is_downloaded:  [{ type: mongoose.Schema.Types.ObjectId, ref: "User"}],
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Video", Video);
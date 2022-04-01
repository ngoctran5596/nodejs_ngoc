const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Video = new Schema(
  {
    title: { type: String },
    duration: { type: String },
    size: { type: String },
    progress: { type: String },
    is_playing: { type: Boolean },
    is_complete: { type: Boolean },
    is_lock: { type: Boolean },
    is_downloaded: { type: Boolean },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Video", Video);
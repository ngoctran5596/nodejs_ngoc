const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const VideoSchema = new Schema ({
  name: {type: String},
  source:{ type: String}
});
module.exports = mongoose.model ('video', VideoSchema);

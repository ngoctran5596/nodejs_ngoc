const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Course = new Schema({
  id: {type:Number},
  name: {type:String},
  lyric: {type:String},
  name: {type:String},
});
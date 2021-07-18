const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema (
  {
    name: {type: String},
    email: {type: String, required: true},
    password: {type: String, required: true},
    image: {
      type: String,
      default: 'https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png',
    },
    isTurtor: {
      type: Boolean,
      default: false, // 0 = nguoi hoc, 1 = nguoi day
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model ('User', UserSchema);

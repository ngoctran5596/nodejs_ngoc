const mongoose = require ('mongoose');

async function connect () {
  try {
    await mongoose.connect ('mongodb://localhost:27017/mp3_ngocApp_dev', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log('Connect successfuly!');
  } catch (error) {
    console.log('Connect failure!');
  }
}

module.exports = {connect};

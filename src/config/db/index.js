const mongoose = require ('mongoose');

async function connect () {
  try {
     //mongodb://localhost:27017/duantotnghiep_dev cua compas duoi la cua atlas
    await mongoose.connect ('mongodb+srv://admin:nhom3qnqsh@cluster0.utcng.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
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

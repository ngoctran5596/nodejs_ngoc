const User = require("../models/User");
const {addUser} = require("../helpers/mics");

module.exports.conect = (io) => {
  io.on("connection", async (socket) => {
    console.log("a user connected");
    // get user
    socket.on("getUsers", async () => {
      User.find((err, user) => {
        io.emit("getAllUser", user);
      }).select('-password');
      socket.on("startUniqueChat",({recieverEmail,senderEmail,recieverID},callback)=>{
          addUser({recieverEmail,senderEmail,recieverID});
      })
    });
  });
};

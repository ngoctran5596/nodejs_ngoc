const User = require("../models/User");
const {addUser,loadMessage,saveMsg} = require("../helpers/mics");
const Messages = require("../models/Message");

module.exports.conect = (io) => {
  io.on("connection", async (socket) => {
    console.log('user connect');
    // get user
    socket.on("getUsers", async () => {
      User.find({},(err, users) => {
        io.emit("getAllUser", users);
      }).select('-password');

    
      loadMessage(socket);

      socket.on(
        "startUniqueChat",
        ({recieverEmail,senderEmail,recieverID},callback)=>{
          addUser({recieverEmail,senderEmail,recieverID},socket);
        }
      );

      socket.on('joinTwoUsers',({roomID},cb)=>{
        socket.join(roomID);
        cb({roomID});
      });

      socket.on('sendTouser',(data)=>{
        socket.broadcast.to(data.roomID).emit('dispatchMsg',{...data});
        const {
          roomID,
          senderEmail,
          recieverEmail,
          composeMsg :{ time, txtMsg},
        } = data;

         new Messages({roomID,senderEmail,recieverEmail,time,txtMsg}).save();
      });
    
    });
  });
};

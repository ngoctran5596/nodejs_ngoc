const Chats = require("../models/Chats");
const Messages = require("../models/Message");
const { v4: uuidV4 } = require("uuid");
const addUser = ({ recieverEmail, senderEmail }, socket) => {
  if (!recieverEmail || !senderEmail) {
    return { error: "User are required" };
  }

  const user = { recieverEmail, senderEmail };
  Chats.aggregate([
    {
      $match: {
        recieverEmail,
        senderEmail,
      },
    },
  ]).then((chat) => {
      if(chat.length > 0){
          socket.emit('openChat',{...chat[0]})
      }else{
          Chats.aggregate([
              {
                  $match:{
                      recieverEmail:senderEmail,
                      senderEmail:recieverEmail,
                  }
              }
          ]).then((lastAttempt)=>{
              if(lastAttempt.length > 0){
                  socket.emit('openChat',{...lastAttempt[0]});
              }else{
                  const newChat = {
                      ...user,
                      roomID: uuidV4()
                  }
                  socket.emit('openChat',newChat);
                  new Chats(newChat).save();
              }
          })
      }
    
  });
};

const loadMessage =(socket)=>{
    socket.on("sentMsgs",({roomID},cb)=>{
        Messages.find({roomID:roomID}).then((msgs)=>{
            console.log(msgs);
            if(!msgs) return cb(null);
            return cb(msgs);
        });
    });
}
const saveMsg =(data,socket)=>{
    console.log('aaaaaaaaaaaaaaaaa',data);
   
}
module.exports = { addUser,loadMessage,saveMsg };

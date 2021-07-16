require('dotenv').config();
const express = require ('express');
const http = require('http');
const path = require ('path');
const morgan = require ('morgan');
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
const cors = require('cors');
const exphbs = require ('express-handlebars');
const conectIo = require ('./app/controllers/socket');
var methodOverride = require('method-override')
const app = express ();
const port = 3000;
const route = require ('./routes');
//import db
const server = http.createServer(app);
const { Server } = require("socket.io");
app.use(cors());
const io = new Server(server, {
  cors: {
    origin: '*',
  }
});
const db = require ('./config/db');
app.use(cookieParser())
app.use(fileUpload({
    useTempFiles: true
}))
//connnect to db
db.connect ();
app.use(methodOverride('_method'))
//public nhung file public
app.use (express.static (path.join ('src', 'public')));
app.use (express.static (path.join ('src', 'resources/assets')));
// console.log(__dirname,'public');
//http loger
// app.use (morgan ());
app.use (
  express.urlencoded ({
    extended: true,
  })
);
app.use (express.json ());

conectIo.conect(io);
//template engine
app.engine (
  'hbs',
  exphbs ({
    extname: '.hbs',
    //sử dụng function trong express handlerbar 
    helpers: {
      sum: (a, b) => a + b,
      dateFormat: require('handlebars-dateformat'),
    },
  })
);
app.set ('view engine', 'hbs');
app.set ('views', path.join (__dirname, 'resources', 'views'));
// console.log(path.join(__dirname,'resources/views'));
//routes khoi tao tuyen duong
route (app);

//127.0.0.1 --- localhost
// io.on('connection', async (socket) => {
//   console.log('a user connected');
//   // join
//   socket.on("join", async ({token, userIds}) => {
//     const verified = jwt.verify(token, process.env.TOKEN_SECRET || "super_cool_secret");
//     const rooms = [];
//     for (let userId of userIds) {
//       const unique = [verified._id.toString(), userId.toString()].sort((a, b) => (a < b ? -1 : 1));
//       const roomId = `${unique[0]}-${unique[1]}`;
//       rooms.push(roomId);
//     }
//     socket.join(rooms);
//     socket.emit("join-response", {
//       status: 1,
//       message: `Join room thành công`,
//     })
//   })
//   // matching
//   // socket.on("like-user", async ({token, userId}) => {
//   //   if (!token) {
//   //     socket.emit("like-user-response", {
//   //       status: 0,
//   //       message: "Thiếu token"
//   //     })
//   //     return;
//   //   }

//   //   const verified = jwt.verify(token, process.env.TOKEN_SECRET || "super_cool_secret");
//   //   const user = await User.findById(verified._id);
//   //   const targetUser = await User.findById(userId);
//   //   const verifiedUser = { ...user._doc };
//   //   const verifiedTargetUser = { ...targetUser._doc };
//   //   delete verifiedUser.password;
//   //   delete verifiedTargetUser.password;
//   //   if (!targetUser) {
//   //     socket.emit("like-user-response", {
//   //       status: 0,
//   //       message: "Không tìm thấy người bạn thích"
//   //     })
//   //     return;
//   //   }
//   //   if (user) {
//   //     if (user.matched_list.findIndex(item => item._id.toString() === userId.toString()) !== -1) {
//   //       socket.emit("like-user-response", {
//   //         status: 0,
//   //         message: "Đã thích người này"
//   //       })
//   //       return;
//   //     }
//   //     await User.findByIdAndUpdate(verified._id, {matched_list: [
//   //       ...user.matched_list,
//   //       verifiedTargetUser
//   //     ]})


//   //     if (targetUser.matched_list.findIndex(item => item._id.toString() === verified._id.toString()) !== -1) {
//   //       await User.findByIdAndUpdate(verified._id, {matching_list: [
//   //         ...user.matching_list,
//   //         verifiedTargetUser
//   //       ]})
//   //       await User.findByIdAndUpdate(userId, {matching_list: [
//   //         ...targetUser.matching_list,
//   //         verifiedUser
//   //       ]}) 
//   //       if (verifiedUser.user_liked_you.findIndex(item => item._id.toString() === verifiedTargetUser._id.toString()) !== -1) {
//   //         const new_user_liked_you = [...verifiedUser.user_liked_you];
//   //         const index = new_user_liked_you.findIndex(item => item._id.toString() === verifiedTargetUser._id.toString())
//   //         new_user_liked_you.splice(index, 1);
//   //         await User.findByIdAndUpdate(verified._id, {user_liked_you: new_user_liked_you})
//   //       }
//   //       const unique = [verified._id.toString(), userId.toString()].sort((a, b) => (a < b ? -1 : 1));
//   //       const roomId = `${unique[0]}-${unique[1]}`;
//   //       socket.join(roomId);

//   //       const matchingList_1 = await Promise.all([...user.matching_list].map(async (item) => {
//   //         const unique = [verified._id.toString(), item._id.toString()].sort((a, b) => (a < b ? -1 : 1));
//   //         const roomId = `${unique[0]}-${unique[1]}`;
//   //         const message = await Chat.findOne({room_id: roomId}, {}, {sort: { 'created_at' : -1 }});
//   //         if (message) {
//   //           return {
//   //             ...item,
//   //             had_message: true,
//   //             message
//   //           }
//   //         } else {
//   //           return {
//   //             ...item,
//   //             had_message: false
//   //           }
//   //         }
//   //       }))

//   //       const matchingList_2 = await Promise.all([...targetUser.matching_list].map(async (item) => {
//   //         const unique = [userId.toString(), item._id.toString()].sort((a, b) => (a < b ? -1 : 1));
//   //         const roomId = `${unique[0]}-${unique[1]}`;
//   //         const message = await Chat.findOne({room_id: roomId}, {}, {sort: { 'created_at' : -1 }});
//   //         if (message) {
//   //           return {
//   //             ...item,
//   //             had_message: true
//   //           }
//   //         } else {
//   //           return {
//   //             ...item,
//   //             had_message: false
//   //           }
//   //         }
//   //       }))

//   //       socket.emit("like-user-response", {
//   //         status: 1,
//   //         message: "Đã tìm thấy người phù hợp",
//   //         data: [
//   //           ...matchingList_1,
//   //           {...
//   //             verifiedTargetUser,
//   //             had_message: false
//   //           }
//   //         ]
//   //       })
//   //       socket.broadcast.to(roomId).emit("like-user-response", {
//   //         status: 1,
//   //         message: "Đã tìm thấy người phù hợp",
//   //         data: [
//   //           ...matchingList_2,
//   //           {
//   //             ...verifiedUser,
//   //             had_message: false
//   //           }
//   //         ]
//   //       })
//   //       return;
//   //     } else  {
//   //       const unique = [verified._id.toString(), userId.toString()].sort((a, b) => (a < b ? -1 : 1));
//   //       const roomId = `${unique[0]}-${unique[1]}`;
//   //       socket.join(roomId);
//   //       if (targetUser.user_liked_you.findIndex(item => item._id.toString() === verified._id.toString()) === -1) {
//   //         await User.findByIdAndUpdate(userId, {user_liked_you: [
//   //           ...targetUser.user_liked_you,
//   //           verifiedUser
//   //         ]})
//   //       }
//   //     }
//   //     socket.emit("like-user-response", {
//   //       status: 1,
//   //       message: "Thích người này thành công"
//   //     })
//   //     socket.broadcast.emit("like-user-response", {
//   //       status: 1,
//   //       message: "Đã có người thích bạn",
//   //       user_id: userId,
//   //       data: [
//   //         ...user.user_liked_you,
//   //         verified._id
//   //       ]
//   //     })
//   //   }
//   // })
//   // chat
//   socket.on("send-message", async ({token, userId, message}) => {
//     if (!token) {
//       socket.emit("send-message-response", {
//         status: 0,
//         message: "Thiếu token"
//       })
//       return;
//     }
//     if (!userId) {
//       socket.emit("send-message-response", {
//         status: 0,
//         message: "Thiếu UserId"
//       })
//       return;
//     }
//     if (!message.trim()) {
//       socket.emit("send-message-response", {
//         status: 0,
//         message: "Thiếu tin nhắn"
//       })
//       return;
//     }
//     const verified = jwt.verify(token, process.env.TOKEN_SECRET || "super_cool_secret");
//     const user = await User.findById(verified._id);
//     const targetUser = await User.findById(userId);
//     const verifiedUser = { ...user._doc };
//     const verifiedTargetUser = { ...targetUser._doc };
//     delete verifiedUser.password;
//     delete verifiedTargetUser.password;
    
//     const unique = [verified._id.toString(), userId.toString()].sort((a, b) => (a < b ? -1 : 1));
//     const roomId = `${unique[0]}-${unique[1]}`;

//     const data = new Chat({
//       message,
//       created_at: new Date(),
//       user_post: verifiedUser,
//       user_id: verifiedUser._id.toString(),
//       room_id: roomId,
//       is_seen: false
//     })
//     await data.save();
//     const matchingList = await Promise.all([...verifiedTargetUser.matching_list].map(async (item) => {
//       if (verified._id.toString() === item._id.toString()) {
//         return {
//           ...item,
//           had_message: true,
//           message: data
//         }
//       } else {
//         return item
//       }
//     }))
//     socket.broadcast.to(roomId).emit("send-message-response", {
//       status: 1,
//       message: "Có tin nhắn mới",
//       data: data,
//       matching_list: matchingList
//     })
//   })
//   // seen 
//   socket.on("seen-message", async ({token, userId}) => { 
//     if (!token) {
//       socket.emit("send-message-response", {
//         status: 0,
//         message: "Thiếu token"
//       })
//       return;
//     }
//     if (!userId) {
//       socket.emit("send-message-response", {
//         status: 0,
//         message: "Thiếu UserId"
//       })
//       return;
//     }
//     const verified = jwt.verify(token, process.env.TOKEN_SECRET || "super_cool_secret");
//     const user = await User.findById(verified._id);
//     const targetUser = await User.findById(userId);
//     const verifiedUser = { ...user._doc };
//     const verifiedTargetUser = { ...targetUser._doc };
//     delete verifiedUser.password;
//     delete verifiedTargetUser.password;
    
//     const unique = [verified._id.toString(), userId.toString()].sort((a, b) => (a < b ? -1 : 1));
//     const roomId = `${unique[0]}-${unique[1]}`;
//     const chat = await Chat.updateMany({ room_id: roomId, user_id: userId }, { is_seen: true });

//     const returnedMatchingList = await Promise.all([...verifiedUser.matching_list].map(async (item) => {
//       const unique = [verifiedUser._id.toString(), item._id.toString()].sort((a, b) => (a < b ? -1 : 1));
//       const roomId = `${unique[0]}-${unique[1]}`;
//       const message = await Chat.findOne({room_id: roomId}, {}, {sort: { 'created_at' : -1 }});

//       if (message) {
//         return {
//           ...item,
//           had_message: true,
//           message
//         }
//       } else {
//         return {
//           ...item,
//           had_message: false,
//         }
//       }
//     }))
//     socket.emit("seen-message-response", {
//       status: 1,
//       message: "Xem tin nhắn thành công",
//       data: returnedMatchingList
//     })
//   })
//   // disconnect
//   socket.on('disconnect', () => {
//     console.log('user disconnected');
//   });
// });


server.listen (port, () => {});

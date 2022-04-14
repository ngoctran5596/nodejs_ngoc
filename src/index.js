require('dotenv').config();
const express = require('express');
const http = require('http');
const path = require('path');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const db = require('./config/db');
const exphbs = require('express-handlebars');

const postController = require('./app/controllers/PostController');
const userController = require('./app/controllers/UserController');
const videoController = require('./app/controllers/Video.controller');
const controllerCodeZ = require("./app/controllers/codeZ/CoursesCodeZ")

const auth = require('./middlewares/auth');
const uploadMiddle = require('./middlewares/uploadImage');
var methodOverride = require('method-override');
var multer = require('multer');
const User = require('./app/models/User');
const { addUser, loadMessage, saveMsg } = require('./app/helpers/mics');
const Messages = require('./app/models/Message');
const app = express();
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
const { Server } = require('socket.io');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 1000000 }));
const route = require('./routes');

const upload = uploadMiddle.upload;

var videoUpload = uploadMiddle.videoUpload;
// app.post("/add",upload2.single ('document'), controller.addDocument)
app.post("/codezVideo", videoUpload.single('video'), videoController.create);
// app.post("/codezVideo", videoUpload.single('video'), videoController.test);
app.post('/postImage', upload.single('imagePost'), postController.create);
app.post('/posttest', upload.single('testmp3'), postController.postes);
app.post('/coursecodez', upload.single('imgCodez'),auth, controllerCodeZ.create);
app.post(
  '/upload_avatar',
  upload.single('avatar'),
  auth,
  userController.updateUser
);
// app.post ('/postNoImage/app', upload.single ('imagePost'), postController.create);
//import db

app.use(cors());
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});


app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

//connnect to db
db.connect();
app.use(methodOverride('_method'));

//public nhung file public
app.use(express.static(path.join('src', 'public')));
app.use(express.static(path.join('src', 'resources/assets')));

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

// conectIo.conect(io);
io.on('connection', async socket => {
 
  // get user
  socket.on('getUsers', async () => {
    User.find({}, (err, users) => {
      io.emit('getAllUser', users);
    }).select('-password');
  });

  socket.on(
    'startUniqueChat',
    ({ recieverEmail, senderEmail, recieverID }, callback) => {
      addUser({ recieverEmail, senderEmail, recieverID }, socket);
    }
  );

  socket.on('joinTwoUsers', ({ roomID }, cb) => {
    
    socket.join(roomID);
    cb({ roomID });
  });

  loadMessage(socket);

  socket.on('sendTouser', data => {
    socket.broadcast.to(data.roomID).emit('dispatchMsg', { ...data });
    const {
      roomID,
      senderEmail,
      recieverEmail,
      composeMsg: { time, txtMsg },
    } = data;

    new Messages({ roomID, senderEmail, recieverEmail, time, txtMsg }).save();
  });

  socket.on('joined', ({ userName }) =>
    socket.broadcast.emit('joined', ` ${userName} joined the chat`)
    // socket.emit ('joined', `Wellcome to Code Learn : ${userName} `)
  );

  socket.on('chat message', ({ chatroomId, userName, message }) => {
    socket.broadcast.to(chatroomId).emit('newMessage', {
      message,
      name: userName,
    });
    // io.to (data.roomID).emit ('chat message', data);
    // socket.broadcast.to (data.roomID).emit ('dispatchCodeLearn', {...data});
  });


  socket.on('joinRoom', ({ chatroomId }) => {
    socket.join(chatroomId);
  });
});
//template engine
app.engine(
  'hbs',
  exphbs({
    extname: '.hbs',
    //sử dụng function trong express handlerbar
    helpers: {
      sum: (a, b) => a + b,
      dateFormat: require('handlebars-dateformat'),
    },
  })
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

//routes khoi tao tuyen duong
route(app,upload.single('img'));


server.listen(PORT, function () {
  console.log('Express server listening on ' + PORT);
});


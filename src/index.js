require("dotenv").config();
const express = require("express");
const http = require("http");
const path = require("path");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const exphbs = require("express-handlebars");
const conectIo = require("./app/controllers/socket");
const postController = require('./app/controllers/PostController');
const auth = require('./middlewares/auth');
var methodOverride = require("method-override");
const app = express();

const port = 3000;
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

const route = require("./routes");
// var upload = multer({ dest: 'uploads/' })
var multer  = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/public/imageNewFeed')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()  + "-" + file.originalname)
  }
}); 
var upload = multer({ storage: storage})
app.post('/postImage', upload.single('imagePost'), postController.create)
//import db
const server = http.createServer(app);
const { Server } = require("socket.io");
app.use(cors());
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
const db = require("./config/db");
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);
//connnect to db
db.connect();
app.use(methodOverride("_method"));
//public nhung file public
app.use(express.static(path.join("src", "public")));
app.use(express.static(path.join("src", "resources/assets")));
// console.log(__dirname,'public');
//http loger
// app.use (morgan ());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

conectIo.conect(io);
//template engine
app.engine(
  "hbs",
  exphbs({
    extname: ".hbs",
    //sử dụng function trong express handlerbar
    helpers: {
      sum: (a, b) => a + b,
      dateFormat: require("handlebars-dateformat"),
    },
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));
// console.log(path.join(__dirname,'resources/views'));
//routes khoi tao tuyen duong
route(app);

server.listen(port, () => {});

var express = require("express");
var app = express();
var port = process.env.PORT || 3000;
var cors = require("cors");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const mongoose = require("mongoose");
var uri = "mongodb+srv://samdb:unicorn1@cluster0.idow2.mongodb.net/school";
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });
var userschema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  role: String,
});
mongoose.connection.on("connected", (err, res) => {
  console.log("connected successfully!!!");
});
app.get("/", (req, res) => {
  var users = mongoose.model("users", userschema);
  users.find({}, function (err, data) {
    res.json(data);
  });
});
app.post("/upload_files", upload.array("files"), uploadFiles);
function uploadFiles(req, res) {
  console.log(req.body);
  console.log(req.files);
  res.json({ message: "Successfully uploaded files" });
}
var server = app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});

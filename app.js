const express = require("express");
const app = express();
var indexRouter = require("./routes/index.js");
require("dotenv").config();
const cookieParser = require("cookie-parser");
app.set("views", "views");
app.set("view engine", "ejs");
// const bodyParser = require("body-parser");
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());
const port = process.env.app_PORT;

app.listen(port, () => console.log(`Server Started on port ${port}...`));
app.use("/", indexRouter);

const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const employeeController = require("./controller/employeeController");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

const hbs = exphbs.create({
  extname: "hbs",
  defaultLayout: "mainLayout",
  layoutsDir: __dirname + "/views/layouts/",
});
app.use(express.static(__dirname + "/public"));
// app.use(express.static("public"));
app.set("views", path.join(__dirname, "/views/"));
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("hello world <a href='/employee' > CRUD </a>");
});

app.use("/employee", employeeController);

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});

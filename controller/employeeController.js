const express = require("express");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "7387479297",
  database: "wtl7c",
});

const router = express.Router();

router.get("/", (req, res) => {
  res.render("employee/addOrEdit", {
    viewTitle: "Add an Employee",
  });
});

// insert into employee (fullName, email, phoneNumber)
// values (
// 	'lorem ipsum',
//     'loremipsum@mgial.com',
//     '789654130'
// );

// for submmitting the data
router.post("/", (req, res) => {
  const fullName = req.body.fullName;
  const email = req.body.email;
  const phoneNumber = req.body.phoneNumber;

  const sqlQuery = `insert into employee (fullName, email, phoneNumber) values (?,?,?); `;
  connection.query(
    sqlQuery,
    [fullName, email, phoneNumber],
    (error, results, fields) => {
      res.redirect("employee/list");
    }
  );
});

router.get("/list", (req, res) => {
  //   res.send("this is from the data");
  const sqlQuery = `select * from employee`;
  connection.query(sqlQuery, (error, results, fields) => {
    const newArr = [...results];
    console.log(newArr);
    res.render("employee/list", {
      list: newArr,
    });
  });
});

module.exports = router;

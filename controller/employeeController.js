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
    style: "addOrEdit.css",
  });
});

// CREATE
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

// READ
router.get("/list", (req, res) => {
  const sqlQuery = `select * from employee`;
  connection.query(sqlQuery, (error, results, fields) => {
    const newArr = [...results];
    res.render("employee/list", {
      list: newArr,
      style: "list.css",
    });
  });
});

// UPDATE
router.get("/:id", (req, res) => {
  const id = req.params.id;
  sqlQuery = `select * from employee where id=? ;`;
  connection.query(sqlQuery, [id], (error, results, fields) => {
    const newArr = [...results];
    res.render("employee/update", {
      style: "update.css",
      employee: newArr[0],
      viewTitle: "Update an Employee",
    });
  });
});

router.post("/update", (req, res) => {
  const id = req.body.id;
  const fullName = req.body.fullName;
  const email = req.body.email;
  const phoneNumber = req.body.phoneNumber;
  sqlQuery = `update employee set fullname = ? , email = ?, phoneNumber = ? where id = ? ;`;
  connection.query(
    sqlQuery,
    [fullName, email, phoneNumber, id],
    (error, results, fields) => {
      res.redirect("/employee/list");
    }
  );
});

// DELETE
router.get("/delete/:id", (req, res) => {
  const id = req.params.id;
  const sqlQuery = `delete from employee where id=? ;`;
  connection.query(sqlQuery, [id], (error, results, fields) => {
    res.redirect("/employee/list");
  });
});

module.exports = router;

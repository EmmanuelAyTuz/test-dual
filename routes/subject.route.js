const { Router } = require("express");
const route = Router();

//Controller
const {
  renderTest,
  renderCreateOne,
  renderReadMany,
  renderReadOne,
  addStudentToSubject,
} = require("../controllers/subject.controller");

route.get("/test", renderTest);

route.post("/subject/create", renderCreateOne); //Require body

route.get("/subject/all", renderReadMany); ////Require param
route.get("/subject/:id", renderReadOne); //Require param

route.post("/subject/user", addStudentToSubject);

module.exports = route;

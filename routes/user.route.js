const { Router } = require("express");
const route = Router();

//Controller
const {
  renderTest,
  renderReadMany,
  renderReadOne,
  renderCreateOne,
  renderDeleteOne,
  renderDeleteManyType,
  renderDeleteMany,
  renderUpdateOne,
} = require("../controllers/user.controller");

route.get("/test", renderTest);

route.post("/user/create", renderCreateOne); //Require body

route.get("/user/all", renderReadMany); ////Require param
route.get("/user/:id", renderReadOne); //Require param

route.post("/user/update/:id", renderUpdateOne);

route.post("/user/delete/id/:id", renderDeleteOne); //Require param
route.post("/user/delete/type", renderDeleteManyType); //Require query
route.post("/user/delete/id", renderDeleteMany); //Require query

module.exports = route;

const { Router } = require("express");
const route = Router();
const { encryptPassword } = require("../helpers/bpassword");

//Controller
const {
  renderTest,
  renderReadMany,
  renderReadOne,
  renderCreateOne,
} = require("../controllers/user.controller");

route.get("/test", renderTest);

route.get("/user/all", renderReadMany);

route.get("/user/:id", renderReadOne);

route.post("/user/create", renderCreateOne);

module.exports = route;

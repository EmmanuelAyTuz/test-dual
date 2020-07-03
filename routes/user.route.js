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
} = require("../controllers/user.controller");

route.get("/test", renderTest);

route.get("/user/all", renderReadMany);

route.get("/user/:id", renderReadOne);

route.post("/user/create", renderCreateOne);

route.post("/user/delete/id/:id", renderDeleteOne);
route.post("/user/delete/type", renderDeleteManyType);
route.post("/user/delete/id", renderDeleteMany);

module.exports = route;

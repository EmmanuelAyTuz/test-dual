const { Router } = require("express");
const route = Router();

route.get("/test", (req, res) => {
  res.send("Test");
});

module.exports = route;

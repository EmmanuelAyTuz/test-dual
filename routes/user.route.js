const { Router } = require("express");
const route = Router();
const { encryptPassword } = require("../helpers/bpassword");

//Model
const User = require("../models/user.model");

route.get("/test", (req, res) => {
  res.send("Test");
});

route.get("/users", async (req, res) => {
  const user = await User.find();
  res.send(user);
});

route.post("/user", async (req, res) => {
  const { username, password } = req.body;
  const user = new User({ username });
  user.password = await encryptPassword(password);
  await user.save();
  res.send(user);
});

module.exports = route;

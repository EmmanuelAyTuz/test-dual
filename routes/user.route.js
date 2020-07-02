const { Router } = require("express");
const route = Router();
const { encryptPassword } = require("../helpers/bpassword");

//Model
const User = require("../models/user.model");

route.get("/test", (req, res) => {
  res.send("Test");
});

route.get("/users", async (req, res) => {
  /* 
    /users?limit=0&where[]=student&where[]=root&sort=-_id
    
    Limit reduces the number of objects returned, 0 returns all.
    Where conditions objects based on type_user.
    Sort sorts the ascending (+) or descending (-) objects indicating the field by which to sort.
  */

  try {
    //Query from req
    let { limit, where, sort } = req.query;
    //Default values
    if (!limit) {
      limit = 0;
    }
    if (!where || where.length < 1) {
      where = await User.schema.path("type_user").enumValues; //Get default enum from model
    }
    if (!sort) {
      sort = "+_id"; //Default sort
    }
    //Find by query
    const user = await User.find()
      .limit(parseInt(limit))
      .where("type_user", where)
      .sort(sort);
    //Return a object
    res.send(user);
  } catch (err) {
    console.error(err);
  }
});

route.post("/user", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username });
    user.password = await encryptPassword(password);
    await user.save();
    if (!user) {
      throw new Error("User has not been saved");
    }
    res.send(user);
  } catch (err) {
    console.error(err);
  }
});

module.exports = route;

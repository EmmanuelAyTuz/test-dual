const express = require("express"); //Express
const app = express();
const { port } = require("./config/env");
const bodyParser = require("body-parser");

//Call DB
require("./database");

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Routes
app.use(require("./routes/user.route"));
app.use(require("./routes/subject.route"));

//Init server
app.listen(port, () => {
  console.log("Server has been started: ", port);
});

module.exports = app;

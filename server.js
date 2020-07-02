const express = require("express"); //Express
const app = express();
const { port } = require("./config/env");

//Routes
app.use(require("./routes/user.route"));

//Init server
app.listen(port, () => {
  console.log("Server has been started: ", port);
});

module.exports = app;

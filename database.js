const mongoose = require("mongoose");
const { mongo_db } = require("./config/env");

mongoose
  .connect(mongo_db, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((db) => {
    console.log("Mongo DB is connected: ", db.connection.client.s.url);
  })
  .catch((err) => {
    console.error("Mongo DB is NOT connected: ", err.message);
  });

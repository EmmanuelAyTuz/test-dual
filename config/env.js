const dotenv = require("dotenv");
dotenv.config();

if (dotenv.error) {
  throw dotenv.error;
}

console.log("Successfull: ", dotenv.parsed);

//Environments of the project
module.exports = {
  url_mongo: process.env.MONGO_DB,
  port: process.env.PORT,
};

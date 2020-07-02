const dotenv = require("dotenv");
const { error, parsed } = dotenv.config();

try {
  if (error) {
    throw error;
  }

  //Environments of the project
  module.exports = {
    mongo_db: parsed.MONGO_DB,
    port: parsed.PORT,
  };

  console.log("Success ENV: ", parsed);
} catch (err) {
  console.error("Error ENV:", err.message, "Please rename or create .env");
}

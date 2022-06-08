const mongoose = require("mongoose");
require("dotenv").config();

const DB_URL = process.env.DB_URL;

mongoose.connect(`${DB_URL}`);

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("connected to database"));

const userSchema = require("./schemas/user");
const User = mongoose.model("User", userSchema);

module.exports = {
  User,
};

const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const schema = new mongoose.Schema(
  {
    name: String,
    surname: String,
    email: String,
    password: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { collection: "users" }
);

schema.methods.comparePassword = function (password) {
  return password === this.password;
};

schema.methods.generateJWT = function () {
  const today = new Date();
  const expirationDate = new Date();
  expirationDate.setDate(today.getDate() + 60);

  let payload = {
    id: this._id,
    email: this.email,
    name: this.name,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: parseInt(expirationDate.getTime() / 1000, 10),
  });
};
module.exports = schema;

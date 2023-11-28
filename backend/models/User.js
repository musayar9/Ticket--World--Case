const mongoose = require("../helpers/db");

const userSchema = new mongoose.Schema({
  email: String,
  firstName: String,
  lastName: String,
  password: String,
  terms: Boolean,
  favorites: [],
  cart: [],
  tickets: [],
  avatar: String,
});

module.exports = mongoose.model("User", userSchema);

const mongoose = require("../helpers/db");

const citySchema = new mongoose.Schema({
  plate: String,
  name: String,
});

module.exports = mongoose.model("City", citySchema);

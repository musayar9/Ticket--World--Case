// db.js
const mongoose = require("mongoose");
require("dotenv").config();

// const dbUrl = "mongodb://127.0.0.1:27017/activity"; 
const dbUrl = process.env.MONGODB_CONNECT_URI;// Your MongoDB connection URL

mongoose.connect(dbUrl);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

module.exports = mongoose;

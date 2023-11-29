const mongoose = require("../helpers/db");

const activitySchema = new mongoose.Schema({
  artist: String,
  players: [{ name: String, personImage: String }],
  title: String,
  city: String,
  description: String,
  category: String,
  image: [{ photo: String }],
  location: String,
  locationName: String,
  locationMap: String,
  ticketPrice: String,
  hour: String,
  date: String,
});

module.exports = mongoose.model("Activity", activitySchema);

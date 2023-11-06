// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Import the Mongoose connection
const mongoose = require("./helpers/db"); // Adjust the path to your db.js file

// Define your Mongoose schema and model for activity
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

const citySchema = new mongoose.Schema({
  plate: String,
  name: String,
});

const Activity = mongoose.model("Activity", activitySchema);
const City = mongoose.model("City", citySchema);
// Define your routes
app.get("/api/activity", async (req, res) => {
  const activity = await Activity.find({});
  res.json({ activity });
});

// app.post("/api/activity", async (req, res) => {
//   const {
//     artist,
//     players,
//     title,
//     city,
//     description,
//     category,
//     image,
//     location,
//     locationName,
//     locationMap,
//     hour,
//     date,
//     ticketPrice,
//   } = req.body;

//   const activity = new Activity({
//     artist,
//     players,
//     title,
//     city,
//     description,
//     category,
//     image,
//     location,
//     locationName,
//     locationMap,
//     hour,
//     date,
//     ticketPrice,
//   });

//   try {
//     const savedActivity = await activity.save();
//     res.json({ activity: savedActivity });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });
// Endpoint to filter activities by category

app.post("/api/activity", async (req, res) => {
  const {
    artist,
    title,
    city,
    description,
    category,
    image,
    location,
    locationName,
    locationMap,
    hour,
    date,
    ticketPrice,
  } = req.body;

  const players = req.body.players || []; // 'players' dizisi yoksa boş bir dizi oluştur
  if (players.length === 0) {
    req.body.players = null;
  }
  const activity = new Activity({
    artist,
    players: req.body.players, // 'players' dizisi boşsa 'null' olacak
    title,
    city,
    description,
    category,
    image,
    location,
    locationName,
    locationMap,
    hour,
    date,
    ticketPrice,
  });

  try {
    const savedActivity = await activity.save();
    res.json({ activity: savedActivity });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/api/activity/category/:category", async (req, res) => {
  const { category } = req.params;

  try {
    const activities = await Activity.find({ category });
    if (activities.length > 0) {
      res.json({ activities });
    } else {
      res
        .status(404)
        .json({ error: "No activities found for the given category" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/api/activity/:id", async (req, res) => {
  const { id } = req.params;
  const {
    artist,
    players,
    title,
    city,
    description,
    category,
    image,
    location,
    locationName,
    locationMap,
    ticketPrice,
    hour,
    date,
  } = req.body;

  try {
    const updatedActivity = await Activity.findByIdAndUpdate(
      id,
      {
        artist,
        players,
        title,
        city,
        description,
        category,
        image,
        location,
        locationName,
        locationMap,
        hour,
        date,
        ticketPrice,
      },
      { new: true } // Return the updated document
    );

    if (updatedActivity) {
      res.json({ activity: updatedActivity });
    } else {
      res.status(404).json({ error: "Activity not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/api/activity/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const activity = await Activity.findById(id);
    if (activity) {
      res.json({ activity });
    } else {
      res.status(404).json({ error: "Activity not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete("/api/activity/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const activity = await Activity.findByIdAndDelete(id);
    if (activity) {
      res.json({ message: "Activity deleted successfully" });
    } else {
      res.status(404).json({ error: "Activity not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//City Schema Get, Post, Put, Delete

//define your city routes
app.get("/api/city", async (req, res) => {
  const city = await City.find({});
  res.json({ city });
});

//city detail get
app.get("/api/city/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const city = await City.findById(id);
    if (city) {
      res.json({ city });
    } else {
      res.status(404).json({ error: "City Not Found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// city post

app.post("/api/city", async (req, res) => {
  const { plate, name } = req.body;

  const city = new City({
    plate,
    name,
  });

  try {
    const savedCity = await city.save();
    res.json({ city: savedCity });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// City Update
app.put("/api/city/:id", async (req, res) => {
  const { id } = req.params;

  const { plate, name } = req.body;

  try {
    const updateCity = await City.findByIdAndUpdate(
      id,
      { plate, name },
      { new: true }
    );

    if (updateCity) {
      res.json({ city: updateCity });
    } else {
      res.status(404).json({ error: "City Not Found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//city delete
app.delete("/api/city/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const city = await City.findByIdAndDelete(id);

    if (city) {
      res.json({ message: "City deleted" });
    } else {
      res.status(404).json({ error: "City not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Start the Express server
const port = process.env.PORT || 5030;
app.listen(port, () => {
  console.log(`Server is running on localhost:${port}`);
});

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
  city: String,
  description: String,
  category: String,
  image: [{ photo: String }],
  location: String,
  ticketPrice: String,
  hour: String,
  date: String,
});

const Activity = mongoose.model("Activity", activitySchema);

// Define your routes
app.get("/api/activity", async (req, res) => {
  const activity = await Activity.find({});
  res.json({ activity });
});

app.post("/api/activity", async (req, res) => {
  const {
    artist,
    city,
    description,
    category,
    image,
    location,
    hour,
    date,
    ticketPrice,
  } = req.body;

  const activity = new Activity({
    artist,
    city,
    description,
    category,
    image,
    location,
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
// Endpoint to filter activities by category
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
    city,
    description,
    category,
    image,
    location,
    ticketPrice,
    hour,
    date,
  } = req.body;

  try {
    const updatedActivity = await Activity.findByIdAndUpdate(
      id,
      {
        artist,
        city,
        description,
        category,
        image,
        location,
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

// Start the Express server
const port = process.env.PORT || 5030;
app.listen(port, () => {
  console.log(`Server is running on localhost:${port}`);
});

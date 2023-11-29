const express = require("express");
const router = express.Router();
const Activity = require("../models/Activity");

router.get("/", async (req, res) => {
  const activity = await Activity.find({});
  res.json({ activity });
});

router.post("/", async (req, res) => {
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

  const players = req.body.players || [];
  if (players.length === 0) {
    req.body.players = null;
  }
  const activity = new Activity({
    artist,
    players: req.body.players,
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

// Endpoint to filter activities by category
router.get("/category/:category", async (req, res) => {
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

//update data by id
router.put("/:id", async (req, res) => {
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

router.get("/:id", async (req, res) => {
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

router.delete("/:id", async (req, res) => {
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

module.exports = router;

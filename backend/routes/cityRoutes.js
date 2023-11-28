const express = require("express");
const router = express.Router();
const City = require("../models/City");

//define your city routes
router.get("/", async (req, res) => {
  const city = await City.find({});
  res.json({ city });
});

//city detail get
router.get("/:id", async (req, res) => {
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

router.post("/", async (req, res) => {
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
router.put("/:id", async (req, res) => {
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
router.delete("/:id", async (req, res) => {
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

module.exports = router;

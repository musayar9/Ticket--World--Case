const express = require("express");
const router = express.Router();
const User = require("../models/User");

//User Schema

router.get("/", async (req, res) => {
  const user = await User.find({});
  res.json({ user });
});

//new user add
router.post("/", async (req, res) => {
  const {
    email,
    password,
    firstName,
    lastName,
    terms,
    favorites,
    cart,
    tickets,
    avatar,
  } = req.body;

  const user = new User({
    email,
    password,
    firstName,
    lastName,
    terms,
    favorites,
    cart,
    tickets,
    avatar,
  });
  try {
    const savedUser = await user.save();
    res.json({ user: savedUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//update user

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const {
    email,
    password,
    firstName,
    lastName,
    terms,
    favorites,
    cart,
    tickets,
    avatar,
  } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        email,
        password,
        firstName,
        lastName,
        terms,
        favorites,
        cart,
        tickets,
        avatar,
      },
      { new: true }
    );

    if (updatedUser) {
      res.json({ user: updatedUser });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);
    if (user) {
      res.status(200).json({ message: "User deleted" });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = router;

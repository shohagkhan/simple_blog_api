const express = require("express");
const router = express.Router();
const User = require("../models/userModel");

// Create User

router.post("/users", async (req, res) => {
  const user = await User.create({ ...req.body });
  res.json(user);
});

// All User

router.get("/users", async (req, res) => {
  const user = await User.find().populate('author', '-_id -user')
  res.json(user);
});

module.exports = router;

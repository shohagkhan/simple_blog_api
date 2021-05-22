const express = require("express");
const router = express.Router();
const Author = require("../models/authorModel");
const User = require("../models/userModel");


// Create Author

router.post("/authors", async (req, res) => {
  const author = await Author.create({ ...req.body });
  const user = await User.findByIdAndUpdate(req.body.user, {author: author._id})
  res.json(author);
});

// All Author

router.get("/authors", async (req, res) => {
  const author = await Author.find().populate('blogs').populate('user', 'email -_id')
  res.json(author);
});



module.exports = router;

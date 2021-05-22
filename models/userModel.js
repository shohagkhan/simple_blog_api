const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
  email: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: "Author",
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;

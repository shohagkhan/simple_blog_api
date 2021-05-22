const mongoose = require("mongoose");

const { Schema } = mongoose;

const authorSchema = new Schema({
  name: String,
  address: {
    country: String,
    city: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  blogs: [{ type: Schema.Types.ObjectId, ref: "Blog" }],
});

const Author = mongoose.model("Author", authorSchema);

module.exports = Author;

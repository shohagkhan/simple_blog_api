const mongoose = require('mongoose')

const { Schema } = mongoose;

const blogSchema = new Schema({
  title: String,
  description: String,
  comments: [
    {
      commentText: String,
    }
  ],
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Author'
  }
  
});


const Blog = mongoose.model("Blog", blogSchema);


module.exports = Blog
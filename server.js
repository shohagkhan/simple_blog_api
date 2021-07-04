const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = 3000;

const blogRoutes = require("./routes/blogRoutes.js");
const authorRoutes = require("./routes/authorRoutes")
const userRoutes = require("./routes/userRoutes")

app.use(express.json());

app.use("/", blogRoutes);
app.use("/", authorRoutes);
app.use("/", userRoutes);

mongoose
  .connect("mongodb://localhost:27017/blogForRefference", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  });


// This code may be helpful only for some mongoose operation.
// We need to follow node_startup project as boilerplate code :
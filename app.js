const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");
const postRoute = require("./routes/posts");

const app = express();

// Middleware: functions that executes when some route was hit
app.use(cors());
app.use(express.json()); // Parse JSON bodies (as sent by API clients)

// Routes
app.use("/post", postRoute);

// Connect with DB (mongo)
mongoose.connect(
  process.env.DB_CONNECTION,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => {
    console.log("connected");
  }
);
// listen
app.listen(5555);

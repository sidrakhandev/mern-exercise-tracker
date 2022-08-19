const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors()); //cors middleware
app.use(express.json()); //allow us to parse json

const uri = process.env.ATLAS_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const exercisesRouter=require('./routes/exercises');
const usersRouter=require('./routes/users');

app.use('/exercises',exercisesRouter);
app.use('/users',usersRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

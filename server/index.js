const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
import("./mongodb.js");
const authroute = require("./routes/authorroute.js");

//env configuration
dotenv.config();

//rest Object
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//use routes
app.use("/auth", authroute);

//port
const port = 3000;

app.get("/", (req, res) => {
  return res.status(200).send("Welcome to Canteen Management System Server");
});

app.listen(port, () => {
  console.log("API is running on port", port);
});

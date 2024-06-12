const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connection = async () => {
  try {
    mongoose.connect(process.env.URL);
    console.log("Database Connected");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connection();

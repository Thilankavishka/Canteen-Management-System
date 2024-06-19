const mongoose = require("mongoose");

//schema
const canteensceema = new mongoose.Schema(
  {
    Canteenname: {
      type: String,
      required: [true, "canteen name required"],
    },
    openclosetime: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

const canteenmodel = mongoose.model("canteen", canteensceema);

module.exports = canteenmodel;

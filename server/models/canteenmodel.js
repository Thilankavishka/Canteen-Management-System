const mongoose = require("mongoose");

//schema
const canteensceema = new mongoose.Schema(
  {
    Canteenname: {
      type: String,
      required: [true, "canteen name required"],
    },
    foods: {
      type: Array,
    },
    openclosetime: {
      type: String,
    },
  },
  { timestamps: true }
);

const canteenmodel = mongoose.model("canteen", canteensceema);

module.exports = canteenmodel;

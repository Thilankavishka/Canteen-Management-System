const mongoose = require("mongoose");
const scheema = mongoose.Schema;

//schema
const orderschema = new mongoose.Schema(
  {
    canteenid: {
      type: scheema.Types.ObjectId,
      ref: "canteen",
    },
    foods: [
      {
        foodid: { type: scheema.Types.ObjectId, ref: "food" },
        foodname: {
          type: String,
          required: true,
        },
        count: {
          type: Number,
          required: true,
          default: 1,
        },
      },
    ],
    payment: {},
    buyer: {
      type: scheema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

const ordermodel = mongoose.model("order", orderschema);

module.exports = ordermodel;

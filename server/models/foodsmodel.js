const mongoose = require("mongoose");
const scheema = mongoose.Schema;

//schema
const foodscheema = new mongoose.Schema(
  {
    foodname: {
      type: String,
      required: [true, "foodname name required"],
    },
    price: {
      type: String,
      required: true,
    },

    Canteenid: {
      type: scheema.Types.ObjectId,
      ref: "canteens",
    },
    availableTime: {
      type: String,
      required: true,
      enum: ["breakfast", "lunch", "dinner", "always"],
    },
    imageurl: {
      type: String,
      default:
        "https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg",
    },
  },
  { timestamps: true }
);

const foodmodels = mongoose.model("food", foodscheema);

module.exports = foodmodels;

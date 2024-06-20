const mongoose = require("mongoose");
const scheema = mongoose.Schema;

//schema
const paymentschema = new mongoose.Schema(
  {
    orderid: {
      type: scheema.Types.ObjectId,
      ref: "order",
    },
    paymentamount: {
      type: Number,
      required: true,
    },
    cardnumber: {
      type: Number,
    },
    paymenttype: {
      type: String,
      enum: ["visa", "master", "amex"],
      default: "visa",
    },

    paymentstatus: {
      type: String,
    },
  },
  { timestamps: true }
);

const paymentmodel = mongoose.model("payment", paymentschema);

module.exports = paymentmodel;

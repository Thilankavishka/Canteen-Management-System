const mongoose = require("mongoose");

//schema
const studentschema = new mongoose.Schema(
  {
    registrationnumber: {
      type: String,
      required: [true, "Registration Number is required"],
      unique: true,
    },
    username: {
      type: String,
      required: [true, "Username is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    telephone: {
      type: String,
      required: [true, "Phone number is required"],
    },
    usertype: {
      type: String,
      required: [true, "User Type is required"],
      default: "Student",
      enum: ["admin", "student", "staff"],
    },
  },
  { timestamps: true }
);

const usermodel = mongoose.model("user", studentschema);

module.exports = usermodel;

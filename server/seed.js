const express = require("express");
const bcrypt = require("bcrypt");
const adminmodel = require("./models/adminmodel.js");
import("./mongodb.js");

async function adminaccount() {
  try {
    const admincount = await adminmodel.countDocuments();
    if (admincount === 0) {
      const hashpassword = await bcrypt.hash("adminpassword", 10);
      const newAdmin = new adminmodel({
        username: "admin",
        password: hashpassword,
      });
      await newAdmin.save();
      console.log("Admin account created");
    } else {
      console.log("Account Already Exists");
    }
  } catch (err) {
    console.log("error");
  }
}

adminaccount();

const express = require("express");
const bcrypt = require("bcrypt");
const adminmodel = require("./models/adminmodel.js");
import("./mongodb.js");

async function mainadminaccount() {
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

async function appliedcanteen() {
  try {
    const admincount = await adminmodel.countDocuments();
    if (admincount === 1) {
      const hashpassword = await bcrypt.hash("applied123", 10);
      const newAdmin = new adminmodel({
        username: "applied",
        password: hashpassword,
      });
      await newAdmin.save();
      console.log("Applied admin account created");
    } else {
      console.log("Account Already Exists");
    }
  } catch (err) {
    console.log("error");
  }
}

async function bsadminaccount() {
  try {
    const admincount = await adminmodel.countDocuments();
    if (admincount === 2) {
      const hashpassword = await bcrypt.hash("bs123", 10);
      const newAdmin = new adminmodel({
        username: "bs",
        password: hashpassword,
      });
      await newAdmin.save();
      console.log("Bs admin account created");
    } else {
      console.log("Account Already Exists");
    }
  } catch (err) {
    console.log("error");
  }
}

async function boyshostelcanteen() {
  try {
    const admincount = await adminmodel.countDocuments();
    if (admincount === 3) {
      const hashpassword = await bcrypt.hash("boyshostel123", 10);
      const newAdmin = new adminmodel({
        username: "boyshostel",
        password: hashpassword,
      });
      await newAdmin.save();
      console.log("Boys Canteen admin account created");
    } else {
      console.log("Account Already Exists");
    }
  } catch (err) {
    console.log("error");
  }
}
mainadminaccount();
appliedcanteen();
bsadminaccount();
boyshostelcanteen();

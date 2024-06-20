const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const authmiddlewear = require("../middlewears/authmiddleweare");
const usermodel = require("../models/usermodel");
const canteenmodel = require("../models/canteenmodel");
const { route } = require("./authorroute");
const foodmodels = require("../models/foodsmodel");
const appliedadminmiddleware = require("../middlewears/appliedadminmiddleware");
const bsadminmiddleware = require("../middlewears/bsadminmiddleware");
const boysadminmiddleware = require("../middlewears/boysadminmiddleware");

//GET user
router.get("/getuser", authmiddlewear, async (req, res) => {
  try {
    //find user
    const user = await usermodel.findById({ _id: req.body.id }, { _id: 0 });
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "User Not Found" });
    }
    //hide password
    user.password = undefined;
    //response
    res
      .status(200)
      .send({ success: true, message: "User Data Get Successfully", user });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get user API",
    });
  }
});

//Update User
router.post("/updateuser", authmiddlewear, async (req, res) => {
  try {
    const user = await usermodel.findById({ _id: req.body.id });
    //validate
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "User Not Found" });
    }
    //update
    const { username, telephone } = req.body;
    if (username) user.username = username;
    if (telephone) user.telephone = telephone;
    //save
    await user.save();
    res
      .status(200)
      .send({ success: true, message: "User updated successfully" });
  } catch (err) {
    console.log(err);
    res
      .status(404)
      .send({ success: false, message: "Error in update user", err });
  }
});

//Reset Password
router.post("/resetpassword", authmiddlewear, async (req, res) => {
  try {
    const { registrationnumber, newpassword } = req.body;
    if (!registrationnumber || !newpassword) {
      return res
        .status(404)
        .send({ success: false, message: "plase provide all details" });
    }
    const user = await usermodel.findOne({
      registrationnumber,
    });
    if (!user) {
      return res.status(500).send({
        success: false,
        message: "User not found or invalid password",
      });
    }
    //hash password
    var salt = bcrypt.genSaltSync(10);
    const hashpassword = await bcrypt.hash(newpassword, salt);
    user.password = hashpassword;
    await user.save();
    res
      .status(200)
      .send({ success: true, message: "Password reset successfully" });
  } catch (error) {
    res
      .status(404)
      .send({ success: false, message: "Error in Reset Passowrd", error });
  }
});

//Delete User
router.delete("/delete/:id", authmiddlewear, async (req, res) => {
  try {
    await usermodel.findByIdAndDelete(req.params.id);
    return res
      .status(200)
      .send({ success: true, message: "Account Delete Successfully" });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "Error in Delete Profile", error });
  }
});

//diplay canteens
router.get("/displaycanteens", authmiddlewear, async (req, res) => {
  try {
    const canteens = await canteenmodel.find();
    if (!canteens) {
      res
        .status(500)
        .json({ success: false, message: "Canteens Not Available" });
    }
    res.status(200).json(canteens);
  } catch (err) {
    console.log(err);
  }
});

//display Foods by Applied Canteen
router.get("/Appliedfoods", authmiddlewear, async (req, res) => {
  try {
    const findfoods = await canteenmodel.aggregate([
      { $match: { Canteenname: "Applied" } },
      {
        $lookup: {
          from: "foods",
          localField: "_id",
          foreignField: "Canteenid",
          as: "foods",
        },
      },
      { $project: { _id: 0, Canteenname: 1, foods: 1 } },
    ]);
    res.status(200).json(findfoods);
  } catch (err) {
    console.log(err);
  }
});

//display Foods by Bs Canteen
router.get("/BsCanteen", authmiddlewear, async (req, res) => {
  try {
    const findfoods = await canteenmodel.aggregate([
      { $match: { Canteenname: "Bs" } },
      {
        $lookup: {
          from: "foods",
          localField: "_id",
          foreignField: "Canteenid",
          as: "foods",
        },
      },
      { $project: { _id: 0, Canteenname: 1, foods: 1 } },
    ]);
    res.status(200).json(findfoods);
  } catch (err) {
    console.log(err);
  }
});

//display Foods by boyshostelcanteen
router.get("/Boyshostelcanteen", authmiddlewear, async (req, res) => {
  try {
    const findfoods = await canteenmodel.aggregate([
      { $match: { Canteenname: "BoysHostelCanteen" } },
      {
        $lookup: {
          from: "foods",
          localField: "_id",
          foreignField: "Canteenid",
          as: "foods",
        },
      },
      { $project: { _id: 0, Canteenname: 1, foods: 1 } },
    ]);
    res.status(200).json(findfoods);
  } catch (err) {
    console.log(err);
  }
});

//display Foods for Applied Canteen Admin
router.get("/Appliedadminfoods", appliedadminmiddleware, async (req, res) => {
  try {
    const findfoods = await canteenmodel.aggregate([
      { $match: { Canteenname: "Applied" } },
      {
        $lookup: {
          from: "foods",
          localField: "_id",
          foreignField: "Canteenid",
          as: "foods",
        },
      },
      { $project: { _id: 0, Canteenname: 1, foods: 1 } },
    ]);
    res.status(200).json(findfoods);
  } catch (err) {
    console.log(err);
  }
});

//display Foods for Bs Canteen admin
router.get("/Bsadminfoods", bsadminmiddleware, async (req, res) => {
  try {
    const findfoods = await canteenmodel.aggregate([
      { $match: { Canteenname: "Bs" } },
      {
        $lookup: {
          from: "foods",
          localField: "_id",
          foreignField: "Canteenid",
          as: "foods",
        },
      },
      { $project: { _id: 0, Canteenname: 1, foods: 1 } },
    ]);
    res.status(200).json(findfoods);
  } catch (err) {
    console.log(err);
  }
});

//display Foods by boyshostelcanteen
router.get("/Boyshosteladminfoods", boysadminmiddleware, async (req, res) => {
  try {
    const findfoods = await canteenmodel.aggregate([
      { $match: { Canteenname: "BoysHostelCanteen" } },
      {
        $lookup: {
          from: "foods",
          localField: "_id",
          foreignField: "Canteenid",
          as: "foods",
        },
      },
      { $project: { _id: 0, Canteenname: 1, foods: 1 } },
    ]);
    res.status(200).json(findfoods);
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;

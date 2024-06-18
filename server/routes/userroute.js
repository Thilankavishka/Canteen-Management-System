const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const authmiddlewear = require("../middlewears/authmiddleweare");
const usermodel = require("../models/usermodel");
const { route } = require("./authorroute");

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

module.exports = router;

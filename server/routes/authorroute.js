const express = require("express");
const router = express.Router();
const usermodel = require("../models/usermodel.js");

//Register
router.post("/register", async (req, res) => {
  try {
    const { registrationnumber, username, password, telephone, usertype } =
      req.body;
    //validate
    if (
      !registrationnumber ||
      !username ||
      !password ||
      !telephone ||
      !usertype
    ) {
      return res
        .status(500)
        .send({ success: false, message: "Please Provide All Fields" });
    }
    const checkexistsuser = await usermodel.findOne({ registrationnumber });
    if (checkexistsuser) {
      return res.status(500).send({
        success: false,
        message: "You are already registered please login",
      });
    }
    //create new user
    const user = await usermodel.create({
      registrationnumber,
      username,
      password,
      telephone,
      usertype,
    });

    res
      .status(201)
      .send({ success: true, message: "Successfully Registered", user });
  } catch (err) {
    //console.log(err);
    res
      .status(500)
      .send({ sucess: false, message: "error in registered API", err });
  }
});

//login
router.post("/login", async (req, res) => {
  try {
    const { registrationnumber, password } = req.body;

    //validation
    if (!registrationnumber || !password) {
      return res.status(500).send({
        success: false,
        message: "Please Provide registraion Number Or Password Fields",
      });
    }
    //check
    const user = await usermodel.find({ registrationnumber });
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "User Not Found" });
    }
    res.status(200).send({
      success: true,
      message: "Login Successfully",
      user,
    });
  } catch (error) {
    console.log(err);
    res
      .status(500)
      .send({ success: false, message: "Error in Login API", error });
  }
});

module.exports = router;

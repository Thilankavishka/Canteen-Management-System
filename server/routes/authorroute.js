const express = require("express");
const router = express.Router();
const usermodel = require("../models/usermodel.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
    //hashing password
    var salt = bcrypt.genSaltSync(10);
    const hashpassword = await bcrypt.hash(password, salt);
    //create new user
    const user = await usermodel.create({
      registrationnumber,
      username,
      password: hashpassword,
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
    //check user
    const user = await usermodel.findOne({ registrationnumber });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }
    //check user password or compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(500)
        .send({ success: false, message: "Invalid Credentials" });
    }
    //token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    user.password = undefined; //used to hide password from console
    res.status(200).send({
      success: true,
      message: "Login Successfully",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Error in Login API", error });
  }
});

module.exports = router;

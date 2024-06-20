const express = require("express");
const router = express.Router();
const usermodel = require("../models/usermodel.js");
const adminmodel = require("../models/adminmodel.js");
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
    const { registrationnumber, username, password, role } = req.body;
    if (role === "admin") {
      //validate
      if (!username || !password || !role) {
        return res.status(500).send({
          success: false,
          message: "Please Provide Username,Password or role Fields",
        });
      }
      //check admin
      const admin = await adminmodel.findOne({ username });
      if (!admin) {
        return res.status(404).send({
          success: false,
          message: "Admin Not Registered",
        });
      }
      //compare admin password
      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
        return res
          .status(500)
          .send({ success: false, message: "Invalid Credentials" });
      }
      const token = jwt.sign(
        { id: admin._id, role: "admin" },
        process.env.JWT_SECRET_ADMIN
      );
      admin.password = undefined;
      res.status(200).send({
        success: true,
        message: "Admin Login Successfully",
        token,
        admin,
      });
      //student part
    } else if (role === "student") {
      //validation
      if (!registrationnumber || !password || !role) {
        return res.status(500).send({
          success: false,
          message: "Please Provide registraion Number,Password or role Fields",
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
      const token = jwt.sign(
        { id: user._id, role: "student" },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );
      user.password = undefined; //used to hide password from console
      res.status(200).send({
        success: true,
        message: "Login Successfully",
        token,
        user,
      });
      //applied admin part
    } else if (role === "appliedadmin") {
      //validate
      if (!username || !password || !role) {
        return res.status(500).send({
          success: false,
          message: "Please Provide Username,Password or role Fields",
        });
      }
      //check admin
      const admin = await adminmodel.findOne({ username });
      if (!admin) {
        return res.status(404).send({
          success: false,
          message: "Applied Admin Not Registered",
        });
      }
      //compare admin password
      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
        return res
          .status(500)
          .send({ success: false, message: "Invalid Credentials" });
      }
      const token = jwt.sign(
        { id: admin._id, role: "appliedadmin" },
        process.env.JWT_SECRET_APPLIED_ADMIN
      );
      admin.password = undefined;
      res.status(200).send({
        success: true,
        message: "Applied Admin Login Successfully",
        token,
        admin,
      });
      //bsadminpart
    } else if (role === "bsadmin") {
      //validate
      if (!username || !password || !role) {
        return res.status(500).send({
          success: false,
          message: "Please Provide Username,Password or role Fields",
        });
      }
      //check admin
      const admin = await adminmodel.findOne({ username });
      if (!admin) {
        return res.status(404).send({
          success: false,
          message: "Bs Admin Not Registered",
        });
      }
      //compare admin password
      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
        return res
          .status(500)
          .send({ success: false, message: "Invalid Credentials" });
      }
      const token = jwt.sign(
        { id: admin._id, role: "bsadmin" },
        process.env.JWT_SECRET_BS_ADMIN
      );
      admin.password = undefined;
      res.status(200).send({
        success: true,
        message: "Bs Admin Login Successfully",
        token,
        admin,
      });
      //boyshostelpart
    } else if (role === "boyhosteladmin") {
      //validate
      if (!username || !password || !role) {
        return res.status(500).send({
          success: false,
          message: "Please Provide Username,Password or role Fields",
        });
      }
      //check admin
      const admin = await adminmodel.findOne({ username });
      if (!admin) {
        return res.status(404).send({
          success: false,
          message: "Boyshostel Admin Not Registered",
        });
      }
      //compare admin password
      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
        return res
          .status(500)
          .send({ success: false, message: "Invalid Credentials" });
      }
      const token = jwt.sign(
        { id: admin._id, role: "boyhosteladmin" },
        process.env.JWT_SECRET_BOYSCANTEEN_ADMIN
      );
      admin.password = undefined;
      res.status(200).send({
        success: true,
        message: "Boyshostel Admin Login Successfully",
        token,
        admin,
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Error in Login API", error });
  }
});

module.exports = router;

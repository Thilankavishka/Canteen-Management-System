const express = require("express");
const router = express.Router();
const canteenmodel = require("../models/canteenmodel.js");
const adminmiddlewear = require("../middlewears/adminmiddleware.js");
const authmiddlewear = require("../middlewears/authmiddleweare.js");

//Add canteen
router.post("/create", adminmiddlewear, async (req, res) => {
  try {
    const { Canteenname, openclosetime, description } = req.body;

    if (!Canteenname || !openclosetime || !description) {
      return res.status(500).send({
        success: false,
        message: "Please provide all details",
      });
    }
    const newcanteen = new canteenmodel({
      Canteenname,
      openclosetime,
      description,
    });

    await newcanteen.save();

    res.status(200).send({
      success: true,
      message: "Canteen Added Successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Error in create canteen");
  }
});

module.exports = router;

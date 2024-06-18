const express = require("express");
const router = express.Router();
const canteenmodel = require("../models/canteenmodel.js");
const authmiddlewear = require("../middlewears/authmiddleweare.js");

//Add canteen
router.post("/create", authmiddlewear, async (req, res) => {
  try {
    const { Canteenname, foods, openclosetime } = req.body;

    if (!Canteenname || !foods || !openclosetime) {
      return res.status(500).send({
        success: false,
        message: "Please provide all details",
      });
    }
    const newcanteen = new canteenmodel({
      Canteenname,
      foods,
      openclosetime,
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

const express = require("express");
const router = express.Router();
const foodmodel = require("../models/foodsmodel.js");
const adminmiddleweare = require("../middlewears/adminmiddleware.js");

router.post("/addfood", adminmiddleweare, async (req, res) => {
  try {
    const { foodname, price, Canteenid, availableTime, imageurl } = req.body;
    //validation part
    if (!foodname || !price || !Canteenid || !availableTime) {
      res
        .status(500)
        .json({ success: false, message: "Please Provide Fields" });
    }
    const newfood = new foodmodel({
      foodname,
      price,
      Canteenid,
      availableTime,
      imageurl,
    });

    await newfood.save();

    res.status(200).send({
      success: true,
      message: "Food Added Successfully",
    });
  } catch (error) {
    console.log(error);
  }
});

//DeletefoodbyID
router.delete("/deletefood/:id", adminmiddleweare, async (req, res) => {
  try {
    const id = req.params.id;
    const findfood = await foodmodel.findByIdAndDelete(id);
    if (!findfood) {
      res.status(404).json({ success: true, message: "food not found" });
    }
    res.status(200).json({ message: "food delete Succesfully" });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;

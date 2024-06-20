const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const usermodel = require("../models/usermodel");
const canteenmodel = require("../models/canteenmodel");
const adminmiddleware = require("../middlewears/adminmiddleware");
const ordermodel = require("../models/ordermodel");
const paymentmodel = require("../models/paymentmodel");

router.get("/studentdetails", adminmiddleware, async (req, res) => {
  try {
    const details = await usermodel.aggregate([
      { $match: { usertype: "student" } },
    ]);
    if (!details) {
      return res
        .status(404)
        .send({ success: false, message: "Error in fine details" });
    }
    res.status(200).json(details);
  } catch (err) {
    res.status(404).json({ success: false, message: "Error in find details" });
  }
});

router.get("/staffdetails", adminmiddleware, async (req, res) => {
  try {
    const details = await usermodel.aggregate([
      { $match: { usertype: "staff" } },
    ]);
    if (!details) {
      return res
        .status(404)
        .send({ success: false, message: "Error in fine details" });
    }
    res.status(200).json(details);
  } catch (err) {
    res.status(404).send({ success: false, message: "Error in find details" });
  }
});

//Delete canteen
router.delete("/delete/:id", adminmiddleware, async (req, res) => {
  const id = req.params.id;
  try {
    const result = await canteenmodel.findByIdAndDelete(id);

    if (!result) {
      return res
        .status(404)
        .send({ success: false, message: "cannot find canteen" });
    }
    res.status(200).send({ message: "Canteen Deleted" });
  } catch (err) {
    console.log(err);
  }
});

//display applied canteen orders
router.get("/getappliedorders", adminmiddleware, async (req, res) => {
  try {
    const canteenId = new mongoose.Types.ObjectId("66722aa083b98c2ba74dcabd"); // Convert string to ObjectId
    const orders = await ordermodel.aggregate([
      { $match: { canteenid: canteenId } },
    ]);
    if (!orders) {
      res.status(404).send({ success: true, message: "orders not found" });
    }
    res.status(200).json(orders);
  } catch (err) {
    console.log(err);
  }
});

//display Bs canteen orders
router.get("/getbscanteenorders", adminmiddleware, async (req, res) => {
  try {
    const canteenId = new mongoose.Types.ObjectId("6672301e83b98c2ba74dcac0"); // Convert string to ObjectId
    const orders = await ordermodel.aggregate([
      { $match: { canteenid: canteenId } },
    ]);
    if (!orders) {
      res.status(404).send({ success: true, message: "orders not found" });
    }
    res.status(200).json(orders);
  } catch (err) {
    console.log(err);
  }
});

//display BoysHostalcanteen orders
router.get("/getboyshostalcanteenorders", adminmiddleware, async (req, res) => {
  try {
    const canteenId = new mongoose.Types.ObjectId("667230ed83b98c2ba74dcac2"); // Convert string to ObjectId
    const orders = await ordermodel.aggregate([
      { $match: { canteenid: canteenId } },
    ]);
    if (!orders) {
      res.status(404).send({ success: true, message: "orders not found" });
    }
    res.status(200).json(orders);
  } catch (err) {
    console.log(err);
  }
});

//Display Payments
router.get("/displaypayments", adminmiddleware, async (req, res) => {
  try {
    const payments = await paymentmodel.find();
    res.status(200).json(payments);
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;

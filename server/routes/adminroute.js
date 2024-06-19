const express = require("express");
const router = express.Router();
const usermodel = require("../models/usermodel");
const canteenmodel = require("../models/canteenmodel");
const adminmiddleware = require("../middlewears/adminmiddleware");

router.get("/studentdetails", adminmiddleware, async (req, res) => {
  try {
    const details = await usermodel.aggregate([
      { $match: { usertype: "student" } },
    ]);
    if (!details) {
      res
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
      res
        .status(404)
        .send({ success: false, message: "Error in fine details" });
    }
    res.status(200).json(details);
  } catch (err) {
    res.status(404).json({ success: false, message: "Error in find details" });
  }
});

//Delete canteen
router.delete("/delete/:id", adminmiddleware, async (req, res) => {
  const id = req.params.id;
  try {
    const result = await canteenmodel.findByIdAndDelete(id);

    if (!result) {
      res.status(404).send({ success: false, message: "cannot find canteen" });
    }
    res.status(200).json({ message: "Canteen Deleted" });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;

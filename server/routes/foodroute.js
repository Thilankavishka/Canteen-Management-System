const express = require("express");
const router = express.Router();
const foodmodel = require("../models/foodsmodel.js");
const ordermodel = require("../models/ordermodel.js");
const paymentmodel = require("../models/paymentmodel.js");
const adminmiddleweare = require("../middlewears/adminmiddleware.js");
const usermiddleweaere = require("../middlewears/authmiddleweare.js");
const { default: mongoose } = require("mongoose");

router.post("/addfood", adminmiddleweare, async (req, res) => {
  try {
    const { foodname, price, Canteenid, availableTime, imageurl } = req.body;
    //validation part
    if (!foodname || !price || !Canteenid || !availableTime) {
      return res
        .status(500)
        .send({ success: false, message: "Please Provide Fields" });
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
      return res.status(404).send({ success: true, message: "food not found" });
    }
    res.status(200).send({ message: "food delete Succesfully" });
  } catch (err) {
    console.log(err);
  }
});

//Update Food
router.put("/updatefood/:id", adminmiddleweare, async (req, res) => {
  try {
    const foodid = req.params.id;
    if (!foodid) {
      return res.status(500).send({
        success: false,
        message: "No food id was found, Provide food id",
      });
    }
    const food = await foodmodel.findById(foodid);
    if (!food) {
      return res
        .status(404)
        .send({ success: false, message: "Food is Not Found" });
    }
    const { foodname, price, Canteenid, availableTime, imageurl } = req.body;

    const updatefood = await foodmodel.findByIdAndUpdate(
      foodid,
      { foodname, price, Canteenid, availableTime, imageurl },
      { new: true }
    );
    res.status(200).send({ success: true, message: "Food was updated" });
  } catch (err) {
    console.log(err);
  }
});

//Place Order
router.post("/placeorder", usermiddleweaere, async (req, res) => {
  try {
    const { canteenid, cart } = req.body;
    //validation
    if (!canteenid || !cart) {
      return res.status(500).send({
        success: false,
        message: "Please food Cart",
      });
    }
    let total = 0;
    //calculate
    cart.map((i) => {
      total = total + i.price * i.count;
    });

    const neworder = new ordermodel({
      canteenid,
      foods: cart,
      payment: total,
      buyer: req.body.id,
    });
    await neworder.save();
    res
      .status(201)
      .send({ success: true, message: "Order Placed Successfully", neworder });
  } catch (err) {
    console.log(err);
  }
});

//Update Order
router.put("/updateorder/:id", usermiddleweaere, async (req, res) => {
  try {
    const orderid = req.params.id;
    if (!orderid) {
      return res
        .status(500)
        .send({ success: false, message: "Order id Not found" });
    }
    const findorder = ordermodel.findById(orderid);
    if (!findorder) {
      return res
        .status(500)
        .send({ success: false, message: "Order id Not found" });
    }
    const { canteenid, cart } = req.body;
    //validation
    if (!canteenid || !cart) {
      return res.status(500).send({
        success: false,
        message: "Please fill food Cart",
      });
    }
    let total = 0;
    //calculate
    cart.map((i) => {
      total = total + i.price * i.count;
    });

    const updateorder = await ordermodel.findByIdAndUpdate(
      orderid,
      {
        canteenid,
        foods: cart,
        payment: total,
        buyer: req.body.id,
      },
      { new: true }
    );

    res
      .status(201)
      .send({ success: true, message: "Order updated Successfully" });
  } catch (err) {
    console.log(err);
  }
});

//Delete Order
router.delete("/delete/:id", usermiddleweaere, async (req, res) => {
  try {
    const id = req.params.id;
    const findorder = await ordermodel.findByIdAndDelete(id);
    if (!findorder) {
      res.status(404).send({ success: false, message: "Order Not Found" });
    }
    res
      .status(404)
      .send({ success: false, message: "Order delete Successfully" });
  } catch (err) {
    console.log(err);
  }
});

//do payment
router.post("/pay/:id", usermiddleweaere, async (req, res) => {
  try {
    const orderid = req.params.id;
    const { cardnumber, paymenttype } = req.body;
    let status = "";
    if (!orderid || !cardnumber || !paymenttype) {
      status = "Payment Failed";
    } else {
      status = "Payment successful";
    }

    const order = await ordermodel.findById(orderid);
    const amount = order.payment;
    const newpayment = new paymentmodel({
      orderid,
      paymentamount: amount,
      cardnumber,
      paymenttype,
      paymentstatus: status,
    });
    await newpayment.save();
    res.status(200).json(newpayment);
    //await newpayment.save();
  } catch (err) {
    console.log(err);
  }
});

//Show Orders to user
router.get("/displaypayment/:id", usermiddleweaere, async (req, res) => {
  try {
    const id = req.params.id;
    const payment = await paymentmodel.findById(id);
    if (!payment) {
      res.status(404).send({ success: false, message: "payment not found" });
    }
    res.status(200).json(payment);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;

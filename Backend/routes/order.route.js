const { Router } = require("express");

const { OrderModel } = require("../models/order.model");

const { auth } = require("../middlewares/auth.middleware");

require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const orderRouter = Router();

//Post order by user
orderRouter.post("/", auth, async (req, res) => {
  const payload = req.body;
  try {
    const data = new OrderModel(payload);
    await data.save();
    res.status(200).send({ msg: "New order added" });
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

//Get order list of particular user only
orderRouter.get("/", async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  if (token) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (decoded) {
      const orderData = await OrderModel.find({ userID: decoded.userID })
        .sort({ date_of_purchase: -1 })
        .populate({
          path: "products.prod_id",
          model: "Product",
        });
      if (orderData.length > 0) {
        res.status(200).json(orderData);
      } else {
        res.status(200).json({ msg: "Nothing here. Let's shop!" });
      }
    } else {
      res.status(400).json({ msg: "Invalid Token !!" });
    }
  } else {
    res.status(400).json({ msg: "Authentication failed" });
  }
});

//Export router
module.exports = orderRouter;

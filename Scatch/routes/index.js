const express = require("express");
const router = express.Router();
const productModel = require("../models/product-model");
const isLoggedin = require("../middlewares/isLoggedIn.js");

router.get("/", function (req, res) {
  let error = req.flash("error");
  res.render("index", { error });
});

router.get("/shop", isLoggedin, async (req, res) => {
  try {
    const products = await productModel.find({});
    res.render("shop", { products });
  } catch (err) {
    res.status(500).send("Error fetching products");
  }
});
module.exports = router;

const express = require("express");
const router = express.Router();
const productModel = require("../models/product-model");
const upload = require("../config/multer-config");

router.get("/", (req, res) => {
  res.send("Hey Products");
});

router.post("/create", upload.single("image"), async (req, res) => {
  try {
    const { name, discount, bgcolor, panelcolor, textcolor, price } = req.body;
    const product = new productModel({
      name,
      image: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
      discount,
      bgcolor,
      panelcolor,
      textcolor,
      price,
    });
    await product.save();
    req.flash("success", "Product created successfully");
    res.redirect("/shop");
  } catch (err) {
    res.status(500).send("Error uploading file");
  }
});

router.get("/images/:id", async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    if (!product || !product.image || !product.image.data) {
      return res.status(404).send("Image not found");
    }
    res.set("Content-Type", product.image.contentType);
    res.send(product.image.data);
  } catch (err) {
    res.status(500).send("Error fetching image");
  }
});

module.exports = router;

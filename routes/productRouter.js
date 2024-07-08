const express = require("express");
const router = express.Router();
const ownerSchema = require('../modals/owner-modal');
const productSchema = require("../modals/product-modal");
const upload = require("../config/multerUpload");
const { isLoggedIn } = require("../middlewares/isLoggedIn");



router.get("/", isLoggedIn, async (req, res) => {
  let products = await productSchema.find();
  res.render("owner/admin", { products });
});

router.post("/create", isLoggedIn, upload.single("image"), async (req, res) => {

  let owner = await ownerSchema.find({email: req.user.email});
  if (!owner) {
    req.flash("error", "You must be an owner to create products.");
    return res.redirect("/");
  }
  try {
    let { name, price, textcolor, panelcolor, discount, is_avail } = req.body;

    let product = await productSchema.create({
      image: req.file.buffer,
      name: req.body.name,
      price: req.body.price,
      textcolor: req.body.textcolor,
      panelcolor: req.body.panelcolor,
      discount: req.body.discount,
      is_avail: req.body.is_avail
    });

    req.flash("success", "Product created successfully.");
    return res.redirect('/owner/admin');

  } catch (err) {
    req.flash("error", err.message);
    return res.redirect('/owner/admin');
  }
});


module.exports = router;
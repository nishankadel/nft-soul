// create route for user
const express = require("express");
const router = express.Router();
const Gallery = require("../models/Gallery");
const SubscriptionEmail = require("../models/SubscriptionEmail");
// const cloudinary = require("../middlewares/cloudinary");
// const upload = require("../middlewares/multer");

router.get("/", (req, res) => {
  res.send("galleries");
});

router.get("/get-gallery", async (req, res) => {
  const galleries = await Gallery.find({});
  res.send(galleries);
});

router.post("/create-gallery", async (req, res) => {
  try {
    const { user_id, gallery_name, nfts, description, price, image } = req.body;
    const gallery = await new Gallery({
      user_id: user_id,
      gallery_name: gallery_name,
      nfts: nfts,
      image: image,
      description: description,
      price: price,
    });
    await gallery.save();
    res.send(gallery);
  } catch (error) {
    res.send(error);
  }
});

router.post("/subscribe", async (req, res) => {
  try {
    const { user_id, email } = req.body;
    const subscriptionEmail = await new SubscriptionEmail({
      user_id: user_id,
      email: email,
    });
    await subscriptionEmail.save();
    res.send(subscriptionEmail);
  } catch (error) {
    res.send(error);
  }
});

router.get("/all-gallery/:id", async (req, res) => {
  const { id } = req.params;
  const galleries = await Gallery.find({ user_id: id });
  res.send(galleries);
});

module.exports = router;

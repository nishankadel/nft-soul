// create route for user
const express = require("express");
const router = express.Router();
const Gallery = require("../models/Gallery");
const SubscriptionEmail = require("../models/SubscriptionEmail");
const cloudinary = require("../middlewares/cloudinary");
const upload = require("../middlewares/multer");

router.get("/get-gallery", async (req, res) => {
  const galleries = await Gallery.find({});
  res.send(galleries);
});

router.post("/create-gallery", upload.single("image"), async (req, res) => {
  try {
    const { user_id, gallery_name, nfts, description, price } = req.body;
    const output = await cloudinary.uploader.upload(req.file.path, {
      folder: "featureimage",
    });
    const gallery = await new Gallery({
      user_id: user_id,
      gallery_name: gallery_name,
      nfts: nfts,
      image: output.secure_url,
      description: description,
      price: price,
    });
    await gallery
      .save()
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.send(err);
      });
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
    await subscriptionEmail
      .save()
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.send(err);
      });
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;

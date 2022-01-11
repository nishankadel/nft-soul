// create route for user
const express = require("express");
const router = express.Router();
const Gallery = require("../models/Gallery");
const SubscriptionEmail = require("../models/SubscriptionEmail");

router.get("/", (req, res) => {
  res.send("galleries");
});

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

router.get("/get-gallery", async (req, res) => {
  try {
    const popular = await Gallery.find({}).limit(4);
    const trending = await Gallery.find({}).sort({ created_at: 1 }).limit(4);
    const toShuffle = await Gallery.find({}).limit(4);
    let premium = shuffle(toShuffle);
    res.send({ trending, popular, premium });
  } catch (error) {
    res.send(error);
  }
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

// create route for user
const express = require("express");
const router = express.Router();
const Gallery = require("../models/Gallery");
const Favourite = require("../models/Favourite");
const PDADetail = require("../models/PDADetail");
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
    const toShuffle = await Gallery.find({}).sort({ created_at: -1 }).limit(4);
    let premium = shuffle(toShuffle);
    res.send({ trending, popular, premium });
  } catch (error) {
    res.send(error);
  }
});

router.get("/all-trending", async (req, res) => {
  try {
    const { page, limit } = req.query;
    const trending = await Gallery.find({})
      .sort({ created_at: 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    const galleryCount = await Gallery.find({}).countDocuments();
    res.send({ trending, galleryCount });
  } catch (error) {
    res.send(error);
  }
});

router.get("/all-popular", async (req, res) => {
  try {
    const { page, limit } = req.query;
    const popular = await Gallery.find({})
      .sort({ view_count: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    const galleryCount = await Gallery.find({}).countDocuments();
    res.send({ popular, galleryCount });
  } catch (error) {
    res.send(error);
  }
});

router.get("/all-premium", async (req, res) => {
  try {
    const { page, limit } = req.query;
    const premium = await Gallery.find({})
      .sort({ created_at: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const galleryCount = await Gallery.find({}).countDocuments();
    res.send({ premium, galleryCount });
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

router.get("/single-gallery/:id", async (req, res) => {
  const { id } = req.params;
  const galleries = await Gallery.findOne({ _id: id });
  galleries.view_count += 1;
  galleries.save();
  res.send(galleries);
});

router.post("/save-pda", async (req, res) => {
  try {
    const { user_id, gallery_id, pda, transaction_hash } = req.body;
    const pdaDetail = await new PDADetail({
      user_id: user_id,
      gallery_id: gallery_id,
      pda: pda,
      transaction_hash: transaction_hash,
    });
    await pdaDetail.save();
    res.send(pdaDetail);
  } catch (error) {
    res.send(error);
  }
});

router.post("/save-favourite", async (req, res) => {
  try {
    const { user_id, gallery_id } = req.body;
    const favourite = await new Favourite({
      user_id: user_id,
      gallery_id: gallery_id,
    });
    await favourite.save();
    res.send(favourite);
  } catch (error) {
    res.send(error);
  }
});

router.get("/get-favourite/:id", async (req, res) => {
  const { id } = req.params;

  const favourite = await Favourite.find({
    user_id: id,
  })
    .populate({
      path: "gallery_id",
    })
    .select("gallery_id");

  res.send(favourite);
});

router.get("/get-favourite-gallery/:id", async (req, res) => {
  const { id } = req.params;

  const favourite = await Favourite.find({
    user_id: id,
  }).select("gallery_id");

  res.send(favourite);
});

module.exports = router;

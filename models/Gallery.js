const mongoose = require("mongoose");

const gallerySchema = mongoose.Schema({
  // write schemas here
  user_id: {
    type: String,
  },

  gallery_name: {
    type: String,
  },

  nfts: {
    type: Array,
  },

  image: {
    type: String,
  },

  description: {
    type: String,
  },

  rank: {
    type: Number,
  },

  price: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  view_count: {
    type: Number,
    default: 0,
  },
});

const Gallery = mongoose.model("Gallery", gallerySchema);

module.exports = Gallery;

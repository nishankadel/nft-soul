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
  
  price: {
    type: String,
  },
});

const Gallery = mongoose.model("Gallery", gallerySchema);

module.exports = Gallery;

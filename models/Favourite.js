const mongoose = require("mongoose");

const favouriteSchema = mongoose.Schema({
  // write schemas here
  user_id: {
    type: String,
  },

  gallery_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Gallery",
  },

  created_at: {
    type: Date,
    default: Date.now(),
  },
});

const Favourite = mongoose.model("Favourite", favouriteSchema);

module.exports = Favourite;

const mongoose = require("mongoose");

const earningSchema = mongoose.Schema({
  // write schemas here
  user_id: {
    type: String,
  },

  gallery_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Gallery",
  },

  datetime: {
    type: Date,
  },

  price: {
    type: Number,
  },
  
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

const Earning = mongoose.model("Earning", earningSchema);

module.exports = Earning;

const mongoose = require("mongoose");

const pdaDetailSchema = mongoose.Schema({
  // write schemas here
  user_id: {
    type: String,
  },

  gallery_id: {
    type: String,
  },

  pda: {
    type: String,
  },

  transaction_hash: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

const PDADetail = mongoose.model("PDADetail", pdaDetailSchema);

module.exports = PDADetail;

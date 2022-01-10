const mongoose = require("mongoose");

const subscriptionEmailSchema = mongoose.Schema({
  // write schemas here
  user_id: {
    type: String,
  },

  email: {
    type: String,
  },
});

const SubscriptionEmail = mongoose.model("SubscriptionEmail", subscriptionEmailSchema);

module.exports = SubscriptionEmail;

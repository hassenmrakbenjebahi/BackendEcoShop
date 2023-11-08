const mongoose = require("mongoose");

const rateSchema = new mongoose.Schema({
  rateOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Rate = mongoose.model("Rate", rateSchema);

module.exports = Rate;

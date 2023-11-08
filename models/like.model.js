const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
  likeOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
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

const Likes = mongoose.model("Like", likeSchema);

module.exports = Likes;

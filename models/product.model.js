const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const productSchema = new Schema({
  name: String,
  description: String,
  image: String,
  code: String,
});

module.exports = model("Product", productSchema);

const Rate = require("../models/rate.model");

exports.getRates = async (req, res) => {
  try {
    const rates = await Rate.find({}).populate("rateOwner")
    .populate("product");
    res.json(rates);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.getRatesByUser = async (req, res) => {
  try {
    const rates = await Rate.find({ rateOwner: req.params.user }).populate("rateOwner")
    .populate("product");
    res.json(rates);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.getRatesByProduct = async (req, res) => {
  try {
    const rates = await Rate.find({ product: req.params.product }).populate("rateOwner")
    .populate("product");
    res.json(rates);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Get rate by ID
exports.getRateById = async (req, res) => {
  try {
    const rate = await Rate.findById(req.params.id)
      .populate("rateOwner")
      .populate("product");
    if (!rate) {
      return res.status(404).json({ msg: "Rate not found" });
    }
    res.json(rate);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Create rate
exports.createRate = async (req, res) => {
  try {
    const { rateOwner, rating, product } = req.body;
    const newRate = new Rate({ rateOwner, rating, product });
    const rateSaved = await newRate.save();
    res.json(rateSaved);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Edit rate
exports.editRate = async (req, res) => {
  try {
    const rate = await Rate.findById(req.params.id);
    if (!rate) {
      return res.status(404).json({ msg: "Rate not found" });
    }
    const { rating } = req.body;
    rate.rating = rating;
    await rate.save();
    res.json(rate);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Delete rate
exports.deleteRate = async (req, res) => {
  try {
    const rate = await Rate.findById(req.params.id);
    if (!rate) {
      return res.status(404).json({ msg: "Rate not found" });
    }
    await rate.remove();
    res.json({ msg: "Rate removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

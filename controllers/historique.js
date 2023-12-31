import Historique from "../models/historique.js";
import Product from "../models/product.js";

// add Product To History
export async function addToHistory (req, res){
  try {
    const { userId, productId } = req.body;
    const newHistoryEntry = await Historique.create({ userId, productId });
    res.status(201).json(newHistoryEntry);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// get the history of user By userId
export async function getUserHistory (req, res) {
  try {
    const userId = req.params.userId;
    const userHistory = await Historique.find({ userId }).populate("productId");
    res.status(200).json(userHistory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// delete History By Id
export async function deleteFromHistory (req, res) {
  try {
    const historyId = req.params.historyId;
    await Historique.findByIdAndDelete(historyId);
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// get the details of product
export async function getProductDetails (req, res) {
  try {
    const productId = req.params.productId;
    const productDetails = await Product.findById(productId);
    res.status(200).json(productDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


// get all history
export async function getAllHistory (req, res) {
  try {
    const histories = await Historique.find()
    //.populate("userId")
    .populate("productId")
    return res.json({
      statusCode: 200,
      Histories: histories});
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      statusCode: 500,
      msg: 'Internal server error' });
  }
};

// get history By Id
export async function getHistoryById (req, res){
  try {
    const histo = await Historique.findById(req.params.historyId);
    if (!histo) {
      return res.status(404).json({ error: 'Histo not found' });
    }
    res.json({Histo: histo});
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
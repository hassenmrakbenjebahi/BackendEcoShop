import express from 'express';
import * as historiqueController  from '../controllers/historique.js';

const router = express.Router();

// Endpoint : POST /historique/add
router.post("/add", historiqueController.addToHistory);

// Endpoint : GET /historique/user/:userId
router.get("/user/:userId", historiqueController.getUserHistory);

// Endpoint : DELETE /historique/:historyId
router.delete("/:historyId", historiqueController.deleteFromHistory);

// Endpoint : GET /historique/product/:productId
router.get("/product/:productId", historiqueController.getProductDetails);

// Endpoint : GET /historique/getHistoryById/:historyId
router.get("/getHistoryById/:historyId", historiqueController.getHistoryById);

// APIs pour dashboard admin concernant les produits enregistrés dans les historiques
router.get("/all", historiqueController.getAllHistory); // Pagination
router.get("/search", historiqueController.searchHistory); // Search
router.get("/sort/:field", historiqueController.sortHistory); // Sorting
router.get("/stats", historiqueController.getHistoryStats); // Statistics
router.get("/analysis/:type", historiqueController.getHistoryAnalysis); // Analysis
router.get("/analysis/category", historiqueController.getSalesByCategoryFromHistory);
router.get("/analysis/brand", historiqueController.getSalesByBrandFromHistory);
router.get("/analysis/best-sellers", historiqueController.getBestSellersFromHistory);
router.get("/analysis/eco-friendly", historiqueController.getEcoFriendlyProductsFromHistory);

export default router;
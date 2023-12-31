import express from 'express';
import * as historiqueController  from '../controllers/historique.js';

const router = express.Router();

// Endpoint : POST /api/history/add
router.post("/add", historiqueController.addToHistory);

// Endpoint : GET /api/history/user/:userId
router.get("/user/:userId", historiqueController.getUserHistory);

// Endpoint : DELETE /api/history/:historyId
router.delete("/:historyId", historiqueController.deleteFromHistory);

// Endpoint : GET /api/history/product/:productId
router.get("/product/:productId", historiqueController.getProductDetails);

// Endpoint : GET /api/history/getHistoryById/:historyId
router.get("/getHistoryById/:historyId", historiqueController.getHistoryById);

// Endpoint : GET /api/history/all
router.get("/all", historiqueController.getAllHistory); 


export default router;
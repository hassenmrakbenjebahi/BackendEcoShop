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


export default router;
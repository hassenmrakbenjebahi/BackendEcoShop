import express from 'express';
import * as historique from '../controllers/historique.js';

const router = express.Router();

router.post("/addToHistory", historique.addToHistory)

router.get("/getAllHistory", historique.getAllHistory)

router.get("/getHistoryById/:historyId", historique.getHistoryById)

router.delete("/deleteHistory/:historyId", historique.deleteHistory)

export default router;
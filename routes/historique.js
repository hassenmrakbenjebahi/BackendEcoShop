import express from 'express';
import * as historique from '../controllers/historique.js';

const router = express.Router();

router.post("/addToHistory", historique.addToHistory)

router.get("/getAllHistory/:historyByUserId", historique.getAllHistory)
router.get("/getAllHistory2", historique.getAllHistory2)

router.delete("/deleteHistory/:historyId", historique.deleteHistory)

export default router;


// router.get("/getHistoryById/:historyId", historique.getHistoryById)
import express from 'express';
import * as historique from '../controllers/historique.js';

const router = express.Router();

router.route("")
    .post(historique.addToHistory)
    .get(historique.getAllHistory)

router.route("/:historyId")
    .get(historique.getHistoryById)
    .delete(historique.deleteHistory)

export default router;
import express from "express";
import { addOnce } from "../controllers/comment.js";

const router=express.Router();

router
.route('/:id/:idu')
.post(addOnce);

export default router;
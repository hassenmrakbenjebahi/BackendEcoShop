import express from "express";
import { addOnce,getAllCommentPost } from "../controllers/comment.js";

const router=express.Router();

router
.route('/:id/:idu')
.post(addOnce);

router
.route('/:id')
.get(getAllCommentPost)
export default router;
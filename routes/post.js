import express from "express";
import{ addOnce , deleteOne, getAll, getOnce, putOne}from '../controllers/post.js';
import multer from '../middlewares/post-multer-config.js'; // Importer la configuration de multer
import { body } from 'express-validator'; // Importer express-validator



const router=express.Router();

router
.route('/')
.get(getAll)
.post(
    multer,
    body('author').isLength({min:5}),
    body('content').isLength({min:5}),
    addOnce);

router
.route('/:id')
.get(getOnce)
.delete(deleteOne)
.put(putOne);

export default router;
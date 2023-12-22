import express from 'express';
import { addOnce, deleteOne, getAll, getOnce, putOne } from '../controllers/product.js'; // Updated controller import
import multer from '../middlewares/product-multer-config.js'; // Updated multer import
import { body } from 'express-validator'; // Import express-validator

const router = express.Router();

router
  .route('/')
  .get(getAll)
  .post(
    multer,
    addOnce
  );

router
  .route('/:id')
  .get(getOnce)
  .delete(deleteOne)
  .put(putOne);

export default router;

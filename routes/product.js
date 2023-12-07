import express from 'express';
import { addOnce, deleteOne, getAll, getOnce, putOne, getProductById } from '../controllers/product.js'; // Updated controller import
import multer from '../middlewares/product-multer-config.js'; // Updated multer import
import { body } from 'express-validator'; // Import express-validator

import { singleImage } from "../middlewares/multer-config.js";

const router = express.Router();

router
  .route('/')
  .get(getAll)
  .post(singleImage, addOnce);

    // body('name'), 
    // body('description'), 
    // body('code'), 
    // body('carbonFootPrint'),
    // body('waterConsumption'),
    // body('recyclability'),

router
  .route('/:id')
  
  .delete(deleteOne)
  .put(putOne);
  router.route("/getone").get(getOnce)

  router.route("/getProductById/:productId").get(getProductById)

export default router;

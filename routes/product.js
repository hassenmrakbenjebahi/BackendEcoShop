import express from 'express';
import { addOnce, deleteOne, getAll, getOnce, putOne, getProductById } from '../controllers/product.js';
import { body } from 'express-validator';

const router = express.Router();

router
  .route('/')
  .get(getAll)
  .post(
     // Updated file field name for multer
    body('name'), // Adjusted validation rules
    body('description'), // Adjusted validation rules
    body('code'), // Adjusted validation rules
    body('carbonFootPrint'),
    body('waterConsumption'),
    body('recyclability'),
    addOnce);

  
router
  .route('/:id')
  
  .delete(deleteOne)
  .put(putOne);
  router.route("/getone").get(getOnce)

  router.route("/getProductById/:productId").get(getProductById)

export default router;

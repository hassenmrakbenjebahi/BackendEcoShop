import express from 'express';
import { addOnce, deleteOne, getAll, getOnce, putOne } from '../controllers/product.js'; // Updated controller import
import multer from '../middlewares/product-multer-config.js'; // Updated multer import
import { body } from 'express-validator'; // Import express-validator

const router = express.Router();

router
  .route('/')
  .get(getAll)
  .post(
     // Updated file field name for multer
    body('name'), // Adjusted validation rules
    body('description'), // Adjusted validation rules
    body('code'), // Adjusted validation rules
    
    addOnce

  )
  ;

  
router
  .route('/:id')
  
  .delete(deleteOne)
  .put(putOne);
  router.route("/getone").get(getOnce)

export default router;

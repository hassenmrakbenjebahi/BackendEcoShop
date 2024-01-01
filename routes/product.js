import express from 'express';
import { addOnce, deleteOne, getAll, getOnce, putOne, getProductById } from '../controllers/product.js';
import { singleImage } from "../middlewares/multer-config.js";

const router = express.Router();

router
  .route('/')
  .get(getAll)
  .post(singleImage, addOnce);

  
router
  .route('/:id')
  
  .delete(deleteOne)
  .put(putOne);
  router.route("/getone").get(getOnce)

  router.route("/getProductById/:productId").get(getProductById)
 // router.route("/addProduct").post(addProduct)

export default router;

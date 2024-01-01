import express from 'express';
import { deleteOne, getAll, getOnce, putOne, getProductById, getByNameAndByCode, addProduct } from '../controllers/product.js';
import { singleImage } from "../middlewares/multer-config.js";

const router = express.Router();

router
  .route('/')
  .get(getAll)
 // .post(singleImage, addOnce);

  
router
  .route('/:id')
  
  .delete(deleteOne)
  .put(putOne);
  router.route("/getone").get(getOnce)

  router.route("/getProductById/:productId").get(getProductById)
  router.route("/searchByNameAndByCode").get(getByNameAndByCode)
  router.route("/addProduct").post(addProduct)

export default router;

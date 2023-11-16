import express from 'express';
import * as authController from '../controllers/authcontroller.js';
const router = express.Router();
import multer from '../middlewares/multer-config.js'
 
router.route("/signup").post(multer,authController.signup);
router.route("/login").post(authController.login);
//router.route("/users").get(authController.protect ,authController.getUsers);
router.route("/otp").post(authController.otp);
router.route("/profile").get(authController.getUsers)

router.route("/updateuser").put(authController.updateUser);

router.route("/forgetPassword").post(authController.forgetPassword);
router.route("/resetPassword").patch(authController.resetPassword);



export default router;  
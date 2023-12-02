import express from 'express';
import * as user from '../controllers/user.js';

const router = express.Router();

router.post("/addUser", user.addUser)
export default router;
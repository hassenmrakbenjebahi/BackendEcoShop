import express from "express";
import{getUserConnected}from '../controllers/user.js';




const router=express.Router();



router
.route('/:id')
.get(getUserConnected)


export default router;
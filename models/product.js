import express from "express";
import mongoose, { Model } from "mongoose";
const{Schema,model}=mongoose;

const productSchema=new Schema({
    name : String,
    description : String,
    image : String,
    code : String,
    isDanger : Boolean
})


export default model('product',productSchema);
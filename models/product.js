import express from "express";
import mongoose, { Model } from "mongoose";
const{Schema,model}=mongoose;

const productSchema=new Schema({
    name : String,
    categorie : String,
    image : String,
    price:Number
})


export default model('product',productSchema);
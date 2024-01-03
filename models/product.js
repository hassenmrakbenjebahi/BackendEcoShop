// import monggose module
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  image: String,
  code: String,
  carbonFootPrint: {
    type: Number,
    unit: "kg", 
  },
  waterConsumption: {
    type: Number,
    unit: "litres", 
  },
  recyclability: {
    type: Number,
    unit: "%", 
  },
  category: String, 
  brand: String, 
  price: Number, 
  stock: Number, 
  sales: {
    type: Number,
    default: 1,
  },
});

// Make exportable
const product = mongoose.model('Product', productSchema);
export default product;



// create productSchema
// const productSchema = new mongoose.Schema({
//     name : String,
//     description : String,
//     image : String,
//     code : String,
//     carbonFootPrint: String,      // unit of measurement (kg of CO2)
//     waterConsumption: String,    // unit of measurement  (litres)
//     recyclability: String,      // unit of measurement (pourcentage)
// });
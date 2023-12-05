// import monggose module
import mongoose from "mongoose";

// create productSchema
const productSchema = new mongoose.Schema({
    name : String,
    description : String,
   // image : String,
    code : String,
    carbonFootPrint: String,      // unit of measurement (kg of CO2)
    waterConsumption: String,    // unit of measurement  (litres)
    recyclability: String,      // unit of measurement (pourcentage)
});

// Make exportable
const product = mongoose.model('Product', productSchema);
export default product;
// import monggose module
import mongoose from "mongoose";

// create impactSchema
const impactSchema = new mongoose.Schema({
    carbonFootprint: String,      // unit of measurement (kg of CO2)
    waterConsumption: String,    // unit of measurement  (litres)
    recyclability: String,      // unit of measurement (pourcentage)
});

// Make exportable
const impact = mongoose.model('Impact', impactSchema);
export default impact;
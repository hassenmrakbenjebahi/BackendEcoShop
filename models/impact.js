// import monggose module
import mongoose from "mongoose";

// create historiqueSchema
const impactSchema = new mongoose.Schema({
    carbonFootprint: String,      // Empreinte carbone en unité de mesure (kg de CO2)
    waterConsumption: String,    // Consommation d'eau en unité de mesure (litres)
    recyclability: String,      // Niveau de recyclabilité en pourcentage
});

// Make exportable
const impact = mongoose.model('Impact', impactSchema);
export default impact;
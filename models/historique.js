// import monggose module
import mongoose from "mongoose";

// create historiqueSchema
const historiqueSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    productName: String,
    scanDate: Date,  //{ type: Schema.Types.ObjectId, ref: 'Scan' }
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    impactId: { type: mongoose.Schema.Types.ObjectId, ref: 'Impact' },
});

// Make exportable
const historique = mongoose.model('Historique', historiqueSchema);
export default historique;
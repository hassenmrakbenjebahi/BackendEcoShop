// import monggose module
import mongoose from "mongoose";

// create historiqueSchema
const historiqueSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    date: { type: Date, default: Date.now },
});


// Make exportable
const historique = mongoose.model('Historique', historiqueSchema);
export default historique;
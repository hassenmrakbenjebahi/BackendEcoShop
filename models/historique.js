// import monggose module
import mongoose from "mongoose";

// create historiqueSchema
const historiqueSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    date: { type: Date, default: Date.now },
});

// Ajouter un hook pre-save pour la conversion
historiqueSchema.pre('save', function(next) {
    // Convertir LocalDateTime en Date
    this.date = new Date(this.date);
    next();
});

// Ajouter une méthode pour la conversion inverse lors de la lecture
historiqueSchema.methods.toLocalDateTime = function() {
    return this.date.toISOString(); // Convertir Date en chaîne ISO
};

// Make exportable
const historique = mongoose.model('Historique', historiqueSchema);
export default historique;
// Import Mongoose
const mongoose = require('mongoose');

// Create product schema
const productSchema = new mongoose.Schema({
    id: { type: String, unique: true, required: true },      
    name: { type: String, required: true },                    
    description: { type: String, required: true },             
    price: { type: Number, required: true },                   
    category: { type: String, required: true },                
    inStock: { type: Boolean, required: true }                 
});

module.exports = mongoose.model('product', productSchema);
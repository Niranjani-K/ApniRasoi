const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema({
    user: { 
        type: SchemaTypes.ObjectId, 
        ref: "User",
        required: true 
    },
    recipe: {
        type: SchemaTypes.ObjectId, ref: "Recipe",required: true
    },
    timestamp: {type: String, required: true},
})

module.exports = mongoose.model('Orders',orderSchema);
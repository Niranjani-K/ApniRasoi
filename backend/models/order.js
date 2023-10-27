const mongoose = require('mongoose');


const inventorySchema = new mongoose.Schema({
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

module.exports = mongoose.model('Inventory',inventorySchema);
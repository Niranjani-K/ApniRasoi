const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema({
    user: { 
        type:  mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required: true 
    },
    recipe: {
        type:  mongoose.Schema.Types.ObjectId, ref: "Recipe",required: true
    },
    timestamp: {type: Date, required: true},
    status: {
        type: Number,
        default: 0
    },
    rating: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('Order',orderSchema);
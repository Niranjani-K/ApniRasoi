const mongoose = require('mongoose');


const inventorySchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    image: {
        data: Buffer, 
        type: String 
    }
})

module.exports = mongoose.model('Inventory',inventorySchema);
const mongoose = require('mongoose');


const ingredientSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    image: {
        data: Buffer, 
        type: String 
    },
    quantity: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Ingredients',ingredientSchema);
const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true
    },
    image: {
        url: { type: String},
        id: { type: String, required: true },
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    instruction: { 
        type: String, 
        required: true, 
    },
    ingredients: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Inventory"
            }
    ],
    category: {
        type: String
    }
}

);

module.exports = mongoose.model('Recipe',recipeSchema);
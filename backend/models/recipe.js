const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true,
        required: true, 
    },
    image: {
        url: { type: String},
        id: { type: String },
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true, 
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
    },
    macronutrients: {
        proteins: Number, // in grams
        carbohydrates: Number, // in grams
        fats: Number, // in grams
        calories : Number, // in kilocalories (kcal)
    },
}

);

module.exports = mongoose.model('Recipe',recipeSchema);

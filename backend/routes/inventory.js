const express = require('express');

const router = express.Router();

const {getIngredient,findIngredient,getIngredientAndInfo} = require('../controllers/inventory');

router.post('/allergy',findIngredient);
router.post('/ingredientId', getIngredient);
router.post('/ingredient', getIngredientAndInfo);



module.exports = router;
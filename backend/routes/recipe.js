const express = require('express');

const router = express.Router();

const {getAllRecipes,getIngredients,getRecipe,getUserRecipes,getCustomRecipes, getRecipes,createRecipe} = require('../controllers/recipe');

router.get('/getRecipes',getAllRecipes);
router.get('/recipes/:page',getRecipes);
router.get('/recipes/:user',getUserRecipes);
router.post('/ingredients', getIngredients);
router.post('/recipe',getRecipe);
router.post('/customRecipes',getCustomRecipes);
router.post('/createRecipe',createRecipe);

module.exports = router;
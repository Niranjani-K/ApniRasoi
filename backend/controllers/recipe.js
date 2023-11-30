const Recipe = require('../models/recipe.js');
const User = require('../models/user.js');
const Inventory = require('../models/inventory.js');
var ObjectId = require('mongodb').ObjectId;
const express = require('express');

exports.getAllRecipes =  async(req,res) => {
    try {
        const recipes = await Recipe.find();
        res.status(200).send(recipes.splice(0,3));
      } catch (e) {
        res.status(404).send(e.message);
        console.log(e.message);
      }
}

exports.getRecipes =  async(req,res) => {
    try {
      const page = req.params.page;
      const itemsPerPage = 10;
      const recipes = await Recipe.find({user: ObjectId('653f609a9cab981f25470a7e')}, undefined, { skip: (itemsPerPage * (page-1)), limit: itemsPerPage }).sort('_id')
      res.status(200).send(recipes);
    } catch (e) {
        res.status(404).send(e.message);
        console.log(e.message);
      }
}

exports.getUserRecipes = async(req,res)=>{
  try{
    const userId = req.params.user;
    const recipes = await Recipe.find({user: ObjectId(userId)});
    res.status(200).send(recipes);

  }catch(e){
    res.status(404).send(e.message);
    console.log(e.message);
  }
}

exports.getCustomRecipes = async(req,res) => {
  try {
    const userId = req.body.userId;
    console.log(userId);
    const user = await User.findOne({_id: ObjectId(userId)});
   
    var obj_ids = user.allergies.map(function(id) { return ObjectId(id); });
    // const Nrecipes =  await Recipe.find({
    //     ingredients : {
    //       $elemMatch: {$in: obj_ids}}
    //     }
    //   );
      const recipes = await Recipe.find({ingredients:{$nin:obj_ids}});
      res.status(200).send(recipes);
   
      
   
  } catch (e) {
    res.status(404).send(e.message);
    console.log(e.message);
  }
}

exports.getIngredients = async(req,res) => {
  try{
    const ingredient_ids  = req.body.ingredient_ids;
    var obj_ids = ingredient_ids.map(function(id) { return ObjectId(id); });
    const ingredients =  await Inventory.find({_id: {$in: obj_ids}});
   
    res.status(200).send(ingredients);

  }catch (e) {
    res.status(404).send(e.message);
    console.log(e.message);
  }
}

exports.getRecipe = async(req,res) => {
  try{
    const recipeId  = req.body.recipeId;
   
    const recipe =  await Recipe.findOne({_id: ObjectId(recipeId)});

    res.status(200).send(recipe);

  }catch (e) {
    res.status(404).send(e.message);
    console.log(e.message);
  }
}

exports.createRecipe = async(req,res) => {
  const recipe = req.body.recipe;
  
  console.log("here");

  const recipeAdded = await Recipe(recipe)
  await recipeAdded.save();

  console.log(recipeAdded);
   res.status(200).send(recipeAdded);
}


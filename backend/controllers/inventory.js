const Inventory = require('../models/inventory.js');
const User = require('../models/user.js');
var ObjectId = require('mongodb').ObjectId;
const axios = require('axios')

exports.getIngredient = async(req,res) => {
    try{
      const id  = req.body.ingredientId;
      const ingredient =  await Inventory.findOne({_id: ObjectId(ids)});
      res.status(200).send(ingredient);
    }catch (e) {
      res.status(404).send(e.message);
      console.log(e.message);
    }
}


exports.getIngredientAndInfo = async(req,res) => {
    const query = req.body.ingredient;
    try{
      const apiRes = await axios.get('https://api.calorieninjas.com/v1/nutrition?query='+query,{
      headers: {
        'X-Api-Key': 'Jm4R7je3tEhn3slSYYQHBQ==mr9L3mGzSO8EwmfF'
      }});
      const ingredient = apiRes.data.items[0];
      var ing =  await Inventory.findOne({name: ingredient.name});
      console.log(ing);
      if(ing == null) {
        const ing2 = await Inventory.findOne({name:  { '$regex' : ingredient.name, '$options' : 'i' }});
        if(ing2 == null)
          return res.json({status:false, message: "Item not found"})
          ing = ing2;
      }
      const infoToSend = {
        "name": query,
        "_id" : ing._id,
        "protiens": Number(ingredient.protein_g).toFixed(2),
        "calories": Number(ingredient.calories).toFixed(2),
        "fats" : Number(ingredient.fat_total_g).toFixed(2),
        "carbohydrates": Number(ingredient.carbohydrates_total_g).toFixed(2),
      }
      res.status(200).send(infoToSend);
    }catch(error){
      console.log(error);
    }


  }

exports.findIngredient = async(req,res) => {
    try{
      
        const ingredientName = req.body.ingredient;
        const userId = req.body.userId;
        const ingredient = await Inventory.findOne({name: ingredientName});
        if(ingredient == null){
          
          return res.json({success: false})
        }
        
        const user = await User.updateOne(
          { _id: ObjectId(userId) }, 
          { $addToSet: { allergies: ingredient._id } },
        );
        
        res.status(200).send(ingredient);
        
    }catch(e) {
      res.status(404).send(e.message);
      console.log(e.message);
    }
}
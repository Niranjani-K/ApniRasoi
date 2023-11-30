
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Inventory = require('../models/inventory.js');
const express = require('express');
const { ObjectId } = require('mongodb');

exports.createUser =  async(req,res) => {
  const {name,email,password,DOB,contact} = req.body;
    const isNewUser = await User.isThisEmailInUse(email);
    if (!isNewUser)
    return res.json({
      success: false,
      message: 'This email is already in use, try sign-in',
    });

    const user = await User({
        name,
        email,
        password,
        DOB,
        contact
    })
    await user.save();
    res.send({success:true,user});
}

exports.userLogin = async (req,res) => {
    const { email, password } = req.body;

  const user = await User.findOne({ email,password });

  if (!user)
    return res.json({
      success: false,
      message: 'Incorrect username or password',
    });


    const token = jwt.sign({ userId: user._id }, 'secretkey', {
        expiresIn: '1d',
      });
      
      const userInfo = {
        name: user.name,
        email: user.email
      }
    res.json({success: true,token});
  
  }

exports.getAllergies = async(req,res) => {
    const userId = req.body.userId;
    const user = await User.findOne({_id: ObjectId(userId)});

    const ingredient_ids  = user.allergies;
    var obj_ids = ingredient_ids.map(function(id) { return ObjectId(id); });
    const ingredients =  await Inventory.find({_id: {$in: obj_ids}});
   
    res.status(200).send(ingredients);
}

  exports.isAuth = async (req, res) => {
    if (req.headers && req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1];
      try {
        const decode = jwt.verify(token, 'secretkey');
        const user = await User.findById(decode.userId);
        if (!user) {
          return res.json({ success: false, message: 'unauthorized access!' });
        }
        return res.json({success:true,message:"Validated",user:user,})

      } catch (error) {
        res.json({ success: false, message: 'Internal server error!' });
      }
    } else {
      res.json({ success: false, message: 'unauthorized access!' });
    }
  };

  exports.getUsers =  async(req,res) => {
    const recipes = await User.find();
    }

    exports.removeAllergy = async(req,res) => {
      try{
        const userId = req.body.userId;
      const ingredientId = req.body.ingredientId;
      const user = await User.updateOne(
        { _id: ObjectId(userId) },
        { $pull: { allergies: ObjectId(ingredientId) } },
        { safe: true, multi: true }
      );
      return res.status(200).json({ message: "Allergy Deleted Successfully" });
      }catch(e){
        console.log(e.message);
      }
    
    }




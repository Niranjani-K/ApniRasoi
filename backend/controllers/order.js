const Recipe = require('../models/recipe.js');
const Order = require('../models/order.js');
const User = require('../models/user.js');
var ObjectId = require('mongodb').ObjectId;
const express = require('express');

exports.orderPlaced =  async(req,res) => {
    
    try {
        const {recipeId,userId} = req.body;
        const order = await Order({
            user: ObjectId(userId),
            recipe: ObjectId(recipeId),
            timestamp: new Date()
        })
        await order.save();

        res.send({success:true, message: 'order placed yay'});

      } catch (e) {
        res.status(404).send(e.message);
        console.log(e.message);
      }
}


exports.findOrders = async(req,res) =>{
    try{

        const {userId} = req.body;

        const _id = ObjectId(userId);

        const orders = await Order.find({user: _id});

        res.status(200).send(orders);
    }catch (e) {
        res.status(404).send(e.message);
        console.log(e.message);
      }
}

exports.rateOrder = async(req,res) => {
  try {
    const {rating,orderId} = req.body;
    const updateResult = await Order.findByIdAndUpdate({_id:ObjectId(orderId)}, {rating: rating});
    res.send({success:true, message: 'order rated'});

  } catch (e) {
    res.status(404).send(e.message);
    console.log(e.message);
  }
}

exports.statusUpdate =  async(req,res) => {
  try {
    const {status,orderId} = req.body;
    const updatedResult = await Order.findByIdAndUpdate({_id:ObjectId(orderId)},{status: status});
    const updatedResult2 = await Order.find({_id:ObjectId(orderId)});
    res.send({success:true, message: 'order status updated'});

  } catch (e) {
    res.status(404).send(e.message);
    console.log(e.message);
  }
}
exports.findOrder = async(req,res) =>{
  try{

      const {orderId} = req.body;
      const _id = ObjectId(orderId);

      const order = await Order.find({_id: _id});
      res.status(200).send(order);

  }catch (e) {
      res.status(404).send(e.message);
      console.log(e.message);
    }
}

exports.getPastOrders = async(req,res) =>{
  try{

      const {userId} = req.body;

      const _id = ObjectId(userId);

      const orders = await Order.find({status: 3});

      res.status(200).send(orders);
  }catch (e) {
      res.status(404).send(e.message);
      console.log(e.message);
    }
}

exports.getCurrentOrders = async(req,res) =>{
  try{

      const {userId} = req.body;

      const _id = ObjectId(userId);

      const orders = await Order.find({
        $or : [
          {
            status: 0
          },
          {
            status: 1
          },
          {
            status: 2
          }
        ]
      });

      res.status(200).send(orders);
  }catch (e) {
      res.status(404).send(e.message);
      console.log(e.message);
    }
}


exports.getUserCurrentOrders = async(req,res) =>{
  try{
      const userId = req.body.userId;
      console.log(userId);
      const _id = ObjectId(userId);

      const orders = await Order.find({user: ObjectId(userId),
        $or : [
          {
            status: 0
          },
          {
            status: 1
          },
          {
            status: 2
          }
        ]
      });
      console.log(orders);
      res.status(200).send(orders);
  }catch (e) {
      res.status(404).send(e.message);
      console.log(e.message);
    }
}

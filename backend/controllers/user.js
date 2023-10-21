
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const express = require('express');

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



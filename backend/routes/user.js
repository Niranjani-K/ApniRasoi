const express = require('express');

const router = express.Router();

const {userLogin, createUser, isAuth,getUsers, getAllergies,removeAllergy} = require('../controllers/user');

router.post('/register',createUser);
router.post('/login',userLogin);
router.get('/validUser',isAuth, (req,res) => {
    res.json({success:true,message:"Validated"});
});
router.get('/getUsers',getUsers);
router.post('/getAllergies',getAllergies);
router.post('/removeAllergy', removeAllergy);


module.exports = router;
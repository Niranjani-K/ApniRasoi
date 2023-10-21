const express = require('express');

const router = express.Router();

const {userLogin, createUser, isAuth} = require('../controllers/user');

router.post('/register',createUser);
router.post('/login',userLogin);
router.get('/validUser',isAuth, (req,res) => {
    res.json({success:true,message:"Validated"});
});
module.exports = router;
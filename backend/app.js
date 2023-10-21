const express = require('express');
var bodyParser = require('body-parser');
require('dotenv').config();
const mongoose = require('mongoose');
const userRouter = require('./routes/user');

const app = express();

app.use(bodyParser.json());

const User = require('./models/user');

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log('database is connected')
}).catch(err => console.log(err));




app.use(express.json());
app.use(userRouter);


app.get('/', (req,res) =>{
     res.json({
        success: true,
        message: 'Welcome to the backend'
    })
})

app.listen(3000, () => {
    console.log('port is listening')
})
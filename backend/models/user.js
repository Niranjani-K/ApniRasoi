const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true,
    },
    password : {
        type: String,
        required: true
    },
    contact : {
        type: String,
        required: true
    },
    DOB : {
        type: Date,
        required: true
    },
    // allergies: [{
    //     type: String,
    // }],
    // past_orders: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Orders'
    // }]
})

userSchema.statics.isThisEmailInUse = async function (email) {
    if (!email) throw new Error('Invalid Email');
    try {
      const user = await this.findOne({ email });
      if (user) return false;
  
      return true;
    } catch (error) {
      console.log('error inside isThisEmailInUse method', error.message);
      return false;
    }
  };

module.exports = mongoose.model('User',userSchema);
const mongoose = require('mongoose');
const { Schema } = mongoose

const userSchema = new Schema({
    name: { type: String, require:true  },
    email: { type: String, unique: true },
    phone: {type: String, require:true},
    password:{type:String,require:true},
    confPassword:{type:String,require:true},
    state:{type:String,require:true},
    district:{type:String,require:true},
    address:{type:String,require:true},
    pincode:{type:Number,require:true},
    
})

const User = mongoose.model('User',userSchema)

module.exports = User; 
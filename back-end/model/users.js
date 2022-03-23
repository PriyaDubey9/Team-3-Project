const mongoose=require("mongoose");
const {Schema}=mongoose;

const usersSchema=new Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    phone:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    state:{type:String,required:true},
    district:{type:String,required:true},
    address:{type:String,required:true},
    pincode:{type:String,required:true},
})

const users=mongoose.model("User",usersSchema);

module.exports=users;
const mongoose=require("mongoose");
const users = require("./users");
const Schema=mongoose.Schema;

const productSchema=new Schema({
    clothType:{type:String},
    quantity:{type:Number},
    washType:[{"wash":false,"iron":false,"fold":false,"pack":false}],
    price:{type:Number}
})

const orderSchema=new Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"users"},
    orderId:{type:String},
    products:[productSchema],
    orderDateTime:{type:String},
    totalQuantity:{type:Number},
    totalPrice:{type:Number},
    status:{type:String}
})

const orders=mongoose.model("Order",orderSchema);

module.exports=orders;
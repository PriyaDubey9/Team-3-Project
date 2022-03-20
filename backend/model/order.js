const mongoose = require('mongoose');
const { Schema } = mongoose

const productSchema = new Schema({
    orderType: { type: String },
    quantity: { type: Number},
    washType: {type: String},
    price:{type:Number},
})

const orderSchema = new Schema({
    orderId: {type:String},
    products: [productSchema],
    product:productSchema,
    orderdateTime:{type:String},
    totalItem:{type:Number},
    totalPrice:{type:String},
    status:{type:String},
    
})

const Order = mongoose.model('Order',userSchema)

module.exports = Order; 
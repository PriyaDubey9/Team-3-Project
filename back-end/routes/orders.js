const express=require("express");
const orders = require("../model/orders");
const router=express.Router();
const bodyParser=require('body-parser');

router.use(bodyParser());
// router.post("/order",(req,res)=>{
//     res.json("ok")
// })
router.post("/order/createOrder",async(req,res)=>{
    try{
        var i=0;
        console.log(req.body);
        // const user=await orders.create(req.body,{userId:req.user});
        const user=await orders.create({
            userId:req.user,
            products:req.body.products,
            orderDateTime:req.body.orderDateTime,
            totalQuantity:req.body.totalQuantity,
            totalPrice:req.body.totalPrice,
            status:"ready to pick up"
        });
        // console.log(user);
        return res.status(200).json({
            status:"success",
            user,
        })
    }
    catch(e){
        return res.status(404).json({
            status:"failed",
            message:e.message
        })
    }
})
router.get("/order/orderGet/:id",async(req,res)=>{
    const user=await orders.find({userId:req.params.id});
    const user1=await orders.find();
    console.log(user);
    console.log(user1);
    return res.json(user1);
})
// router.put("/order/updateOrder",async(req,res)=>{
//     console.log(req.body);
//     return res.json("put orders");
// })
router.put("/order/:id",async(req,res)=>{
    // const user=await orders.findOne({userId:req.params.id})
    const user= await orders.updateOne({userId:req.params.id},{status:"cancelled"})
    // console.log(user);
    return res.json(user);
})
module.exports=router;

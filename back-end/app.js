const express=require("express");
const mongoose = require("mongoose");
const app=express();
const users=require("./model/users");
const SECRET="restapi";
const jwt=require("jsonwebtoken");

const userRoutes=require("./routes/users");
const orderRoutes=require("./routes/orders");

// mongoose.connect("mongodb+srv://manidb:manidb@cluster0.udfg0.mongodb.net/laundryApp?retryWrites=true&w=majority")

// mongoose.connect("mongodb+srv://group3:group3@laundry-app.lhuwf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
mongoose.connect("mongodb://localhost:27017/laundryApp")

mongoose.connection.once('open',function(){
    console.log('Database connected Successfully');
}).on('error',function(err){
    console.log('Error', err);
})

app.use("/api/v1/user",userRoutes);
app.use("/api/v1/order",(req,res,next)=>{
    const token=req.headers.authorization.split("test ")[1];
    // console.log(req.headers.authorization.split("test ")[1])
    if(!token){
        return res.status(404).json({
            status:"failed",
            message:"token is missing"
        })
    }
    // jwt verify token
    jwt.verify(token,SECRET,async function(err,decoded){
        if(err){
            return res.status(404).json({
                status:"failed",
                message:"invaild token"
            })
        }
        req.user=decoded.data;
        next();
    })
})
app.use("/api/v1/",orderRoutes);

app.listen(3001,()=>console.log("server at 3001"))
// app.listen(3000,()=>console.log("server at 3000"))
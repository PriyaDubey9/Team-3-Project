const express=require("express");
const router=express.Router();
const users=require("../model/users");
const bodyParser=require("body-parser");
const bcrypt=require("bcrypt");
const {body,validationResult} =require("express-validator");
const jwt=require("jsonwebtoken");
const SECRET="restapi";

router.use(bodyParser());

router.post("/login",body("password"),async(req,res)=>{
    try{
        // console.log(req.body);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        var user=await users.findOne({email:req.body.emailORphone});
        if(!user){
            var user=await users.findOne({phone:req.body.emailORphone});
            if(!user){
                return res.json({
                    status:"failed",
                    message:"phone number is not registered"
                })
            }
            bcrypt.compare(req.body.password,user.password,async function(err,result){
                if(result){
                    var token = jwt.sign({
                        exp: Math.floor(Date.now() / 1000) + (60 * 60),
                        data: user._id
                      }, SECRET);
                    return res.status(200).json({
                        status:"success",
                        message:"loggedin phone successfully",
                        token
                    })
                }  
                return res.status(404).json({
                    status:"failed",
                    message:"wrong password"
                })
            })
        }
        else
        {
        bcrypt.compare(req.body.password,user.password,async function(err,result){
            if(result){
                var token = jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 60),
                    data: user._id
                  }, SECRET);
                return res.status(200).json({
                    status:"success",
                    message:"loggedin email successfully",
                    token
                })
            }
            return res.status(404).json({
                status:"failed",
                message:"wrong password"
            })
        })
        }
    }
    catch(e){
        return res.status(404).json({
            status:"failed not entered",
            message:e.message
        })
    }
})

router.post("/register",body("name"),body("email"),body("password"),body("phone"),body("address"),body("state"),body("pincode"),body("district"),async(req,res)=>{

    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        bcrypt.hash(req.body.password,10,async(err,hash)=>{
            if(hash){
            const user=await users.insertMany({
                name:req.body.name,
                email:req.body.email,
                password:hash,
                phone:req.body.phone,
                address:req.body.address,
                state:req.body.state,
                district:req.body.district,
                pincode:req.body.pincode
            })
            return res.status(200).json({
                status:"success",
                user
            })
            }
        })
    }catch(e){
        return res.status(404).json({
            status:"failed",
            message:e.message
        })
    }
})

module.exports=router;

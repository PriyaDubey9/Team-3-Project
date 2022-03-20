const express=require('express');
const app = express();
const mongoose = require('mongoose');


app.get("/", async (req,res)=>{ // create a route using the HTTP GET request to the url/path specified
    
    res.send("ok")
})
mongoose.connect('mongodb+srv://group3:group3@laundry-app.lhuwf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
mongoose.connection.once('open',function(){
    console.log('Database connected Successfully');
}).on('error',function(err){
    console.log('Error', err);
})

app.listen(3000, () => console.log("server is started"));
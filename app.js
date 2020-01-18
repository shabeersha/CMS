const express = require('express');
const mongoose = require('mongoose');
const path = require('path');


const app=express();

//Config Mongoose

mongoose.connect("mongodb://localhost:27017/cmsDB",{ useNewUrlParser: true })
    .then( response =>{
        console.log("MongoDB connected Successfully");
    }).catch( err=>{
        console.log("Database Connection Failed");
});



/* Configure Express*/
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));

/* Routes */

app.use('/',(req,res) =>{
        res.send("welcome to cms");
});






app.listen(3000,() =>{
    console.log("Server is Running on Port 3000");
});
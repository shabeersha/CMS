const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const hbs = require('express-handlebars');
const {mongoDBurl}= require('./config/configuration');


const app=express();

//Config Mongoose

mongoose.connect(mongoDBurl,{ useNewUrlParser: true })
    .then( response =>{
        console.log("MongoDB connected Successfully");
    }).catch( err=>{
        console.log("Database Connection Failed");
});



/* Configure Express*/
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));




/* Setup view Engine for Using Handlebars */

app.engine('.hbs',hbs({defaultLayout:'default', extname:'.hbs'}));
app.set('view engine', '.hbs');



/* Routes */

app.use('/',(req,res) =>{
        res.render('default/index');
});






app.listen(3000,() =>{
    console.log("Server is Running on Port 3000");
});
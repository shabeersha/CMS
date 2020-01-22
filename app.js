const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const hbs = require('express-handlebars');
const {mongoDBurl, PORT}= require('./config/configuration');


const app=express();

//Config Mongoose

mongoose.connect(mongoDBurl,{ useNewUrlParser: true, useUnifiedTopology: true })
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

const defaultRoutes=require('./routes/defaultRoutes');
app.use('/',defaultRoutes);





app.listen(PORT,() =>{
    console.log(`Server is Running on Port ${PORT}`);
});
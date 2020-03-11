const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const hbs = require('express-handlebars');
const {mongoDBurl, PORT}= require('./config/configuration');
const flash = require('connect-flash');
const session = require('express-session');
const methodOverride= require('method-override');
const {selectOption}=require('./config/customFunctions');

const {globalVariables} = require('./config/configuration');


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

/* Flash and Session */
app.use(session({
    secret:'anysecret',
    saveUninitialized:true,
    resave:true
}));

app.use(flash());

app.use(globalVariables);



/* Setup view Engine for Using Handlebars */

app.engine('.hbs',hbs({defaultLayout:'default', extname:'.hbs',helpers:{select:selectOption}}));
app.set('view engine', '.hbs');

/* method override middleware  */
app.use(methodOverride('newMethod'));




/* Routes */

const defaultRoutes=require('./routes/defaultRoutes');
const adminRoutes=require('./routes/adminRoutes');

app.use('/',defaultRoutes);
app.use('/admin',adminRoutes);






app.listen(PORT,() =>{
    console.log(`Server is Running on Port ${PORT}`);
});
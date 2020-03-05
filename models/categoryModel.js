const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = Schema({

   title:{
       type:String,
       required:true
   }


});

module.exports = { Category: mongoose.model('Category',CategorySchema)};
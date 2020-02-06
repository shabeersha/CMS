const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = Schema({

   title:{
       type: String,
       required: true
   },

    status:{
       type: String,
        default: 'Public'
    },

    creationDate:{
       type: Date,
        default: Date.now()
    },

    description:{
       type: String,
        required: true
    }

});

module.exports = { Post: mongoose.model('post',PostSchema)};
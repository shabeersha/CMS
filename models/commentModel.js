const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = Schema({

   body:{
       type:String,
       required:true
   },
   user:{
       type:Schema.Types.ObjectId,
       ref:'user'
   },
    date:{
       type:Date,
        default:Date.now()
    },
    CommentIsApproved:{
       type:Boolean,
        default: false
    }


});

module.exports = { comment: mongoose.model('comment',CommentSchema)};
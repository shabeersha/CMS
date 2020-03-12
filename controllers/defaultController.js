const post=require('../models/postModel').Post;
const category=require('../models/categoryModel').Category;


module.exports = {
    index:async (req,res) => {

        const posts= await post.find();
        const categories= await category.find();
        res.render('default/index',{posts:posts, categories:categories});
    },


    loginGet:(req,res) => {
    res.render('default/login');
    },
    loginPost:(req,res) => {
        res.send("submitted");
    },


    registerGet:(req,res) => {
      res.render('default/register');
    },
    registerPost:(req,res) => {
        res.send('Registered');
    }
};
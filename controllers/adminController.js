const Post = require('../models/postModel').Post;


module.exports={
  index:(req,res)=>{
      res.render('admin/index');
  },
    getPosts:(req,res)=>{
    Post.find().then(posts => {
      res.render('admin/posts/index',{posts:posts});
    });

    },
    submitPosts:(req,res)=>{
      const newPost= new Post({
        title:req.body.title,
        description:req.body.description,
        status:req.body.status
      });

      newPost.save().then(post =>{
        console.log(post);
        req.flash('success-message','Post Created Successfully');
        res.redirect('/admin/posts');

      });
    },
    createPosts:(req,res)=>{
      res.render('admin/posts/create');
    }
};
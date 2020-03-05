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
      //todo form validation is pending

      const commentsAllowed = req.body.allowComments?true:false;

      const newPost= new Post({
        title:req.body.title,
        description:req.body.description,
        status:req.body.status,
        allowComments:commentsAllowed
      });

      newPost.save().then(post =>{
        console.log(post);
        req.flash('success-message','Post Created Successfully');
        res.redirect('/admin/posts');

      });
    },
    createPosts:(req,res)=>{
      res.render('admin/posts/create');
    },
    editpost:(req,res)=>{
    const id=req.params.id;
    Post.findById(id).then(post=>{
      res.render('admin/posts/edit',{post:post});
    });
    }
};
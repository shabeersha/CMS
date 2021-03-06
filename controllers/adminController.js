const Post = require('../models/postModel').Post;
const Category= require('../models/categoryModel').Category;
const {isEmpty}=require('../config/customFunctions');


module.exports={
  index:(req,res)=>{
      res.render('admin/index');
  },
    getPosts:(req,res)=>{
    Post.find()
        .populate('category')
        .then(posts => {
      res.render('admin/posts/index',{posts:posts});
    });

    },
    submitPosts:(req,res)=>{
      //todo form validation is pending

      const commentsAllowed = req.body.allowComments?true:false;

      let filename = '';

      if (!isEmpty(req.files)){
          let file =req.files.uploadedFile;
          filename = file.name;
          let uploadDir = './public/uploads/';

          file.mv(uploadDir+filename,(error) =>{
            if(error)
              throw error;
          });

      }

      const newPost= new Post({
        title:req.body.title,
        description:req.body.description,
        status:req.body.status,
        allowComments:commentsAllowed,
        category:req.body.category,
        file:`/uploads/${filename}`
      });

      newPost.save().then(post =>{
        console.log(post);
        req.flash('success-message','Post Created Successfully');
        res.redirect('/admin/posts');

      });
    },
    createPosts:(req,res)=>{
      Category.find().then(cats=>{
        res.render('admin/posts/create', {categories: cats});
      })
    },
    editpost:(req,res)=>{
    const id=req.params.id;
    Post.findById(id)
        .then(post=>{
          Category.find().then(cats=>{
            res.render('admin/posts/edit',{post:post,categories:cats});
          })

    });
    },

  editpostsubmit:(req,res)=>{
    const commentsAllowed = req.body.allowComments?true:false;


    const id=req.params.id;
    Post.findById(id)
        .then(post=>{
         post.title=req.body.title;
         post.status=req.body.status;
         post.allowComments=commentsAllowed;
         post.description=req.body.description;
         post.category=req.body.category;

         post.save().then(updatePost => {
           req.flash('success-message',`The Post ${updatePost.title} has been updated.`);
           res.redirect('/admin/posts');
         });



        });

  },

    deletepost:(req,res)=>{
      Post.findByIdAndDelete(req.params.id)
          .then(deletedPost=>{
          req.flash('success-message',`The Post ${deletedPost.title} Has been Deleted`);
          res.redirect('/admin/posts');
          });
    },
  /*Category*/
  getCategories:(req,res) =>{
    Category.find().then(cats =>{
      res.render('admin/category/index',{categories:cats});
    });

  },
  createCategories :(req,res) =>{
    var categoryName = req.body.name;

    if(categoryName) {
      const newCategory = new Category({
        title: categoryName
      });laceholder="Enter Title"

      newCategory.save().then(category =>{
        res.status(200).json(category);
      })

    }
  },
  editCategoriesGetRoute:async (req,res)=>{
    const catId = req.params.id;
    const cats=await Category.find();
    Category.findById(catId).then(cat => {
      res.render('admin/category/edit',{category:cat,categories:cats});
    });
  },

  editCategoriesPostRoute:(req,res)=>{
    const catId = req.params.id;
    const newTitle = req.body.name;

    if(newTitle){
      Category.findById(catId).then(category => {
        category.title=newTitle;
        category.save().then(updated=>{
          res.status(200).json({url:'/admin/category'});
        })

      })
    }
  },
  deletecategory:(req,res)=>{
    Post.findByIdAndDelete(req.params.id)
        .then(deletedcategory=>{
          req.flash('success-message',`The Post ${deletedcategory.title} Has been Deleted`);
          res.redirect('/admin/category');
        });
  },

};
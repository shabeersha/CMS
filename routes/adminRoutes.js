const express = require('express');
const  router = express.Router();
const  adminController = require('../controllers/adminController');

router.all('/*',(req,res,next)=>{
   req.app.locals.layout='admin';
   next();
});

router.route('/')
    .get(adminController.index);
router.route('/posts')
    .get(adminController.getPosts);


router.route('/posts/create')
    .get(adminController.createPosts)
    .post(adminController.submitPosts);

router.route('/posts/edit/:id')
    .get(adminController.editpost);

router.route('/posts/delete/:id')
    .delete(adminController.deletepost);

/* ADMIN CATEGORY ROUTES*/

router.route('/category')
    .get(adminController.getCategories)
    .post(adminController.createCategories);

module.exports=router;
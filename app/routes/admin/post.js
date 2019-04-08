const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const {userAuthenticated} = require('../../middlewares/auth-middleware');

const postCtrl = require('../../controllers/admin/post')
const postValidator = require('../../validators/admin/post-validator');

router.all('/*',userAuthenticated,(req,res,next)=>{
    req.app.locals.layout = 'admin';
    next();
});

router.get('/',postCtrl.getPosts);

router.get('/create',postCtrl.getCreatePost);
router.post('/create' ,postValidator.validateCreatePost(),postCtrl.CreatePost);

router.get('/edit/:id',postCtrl.getEditPost);
router.put('/edit/:id',postValidator.validateCreatePost(),postCtrl.editPost);

router.delete('/delete/:id',postCtrl.deletePost);

module.exports = router;
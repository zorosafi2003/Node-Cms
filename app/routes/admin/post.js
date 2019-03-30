const express = require('express');
const router = express.Router();

const postCtrl = require('../../controllers/admin/post')

router.all('/*',(req,res,next)=>{
    req.app.locals.layout = 'admin';
    next();
});

router.get('/',postCtrl.getPosts);

router.get('/create',postCtrl.getCreatePost);
router.post('/create',postCtrl.CreatePost);

router.get('/edit/:id',postCtrl.getEditPost);
router.put('/edit/:id',postCtrl.editPost);

router.delete('/delete/:id',postCtrl.deletePost);

module.exports = router;
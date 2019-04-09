const express = require('express');
const router= express.Router();

const commentCtrl = require('../../controllers/admin/comment');

router.all('/*',(req,res,next)=>{
    req.app.locals.layout = 'admin';
    next();
})

router.get('/',commentCtrl.getComments);
router.post('/create',commentCtrl.postComment);
router.delete('/delete/:id',commentCtrl.deleteComment);

module.exports = router;
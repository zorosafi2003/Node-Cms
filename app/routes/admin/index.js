const express = require('express');
const router = express.Router();
const {userAuthenticated} = require('../../middlewares/auth-middleware');

const adminCtrl = require('../../controllers/admin/index');

router.all('/*',userAuthenticated ,(req,res,next)=>{
    req.app.locals.layout = 'admin';
    next();
});

router.use('/',adminCtrl.getIndex);

module.exports = router;

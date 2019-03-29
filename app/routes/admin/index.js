const express = require('express');
const router = express.Router();

const adminCtrl = require('../../controllers/admin/index');

router.all('/*',(req,res,next)=>{
    req.app.locals.layout = 'admin';
    next();
});

router.use('/',adminCtrl.getIndex);

module.exports = router;

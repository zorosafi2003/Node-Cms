const express = require('express');
const router = express.Router();

const homeCtrl = require('../../controllers/home/index');

router.all('/*',(req,res,next)=>{
    req.app.locals.layout = 'home';
    next();
});

router.get('/',homeCtrl.getHome);
router.get('/about',homeCtrl.getAbout);

module.exports = router;
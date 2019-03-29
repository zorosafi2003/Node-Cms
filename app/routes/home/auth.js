const express = require('express')
const router = express.Router();

const authCtrl = require('../../controllers/home/auth');

router.all('/*',(req,res,next)=>{
    req.app.locals.layout = 'home';
    next();
});

router.get('/login',authCtrl.getLogin);
router.get('/register',authCtrl.getRegister);

module.exports = router;
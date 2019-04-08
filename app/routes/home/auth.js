const express = require('express')
const router = express.Router();

const authCtrl = require('../../controllers/home/auth');
const userValidator = require('../../validators/home/user-validator');

router.all('/*',(req,res,next)=>{
    req.app.locals.layout = 'home';
    next();
});

router.get('/login',authCtrl.getLogin);
router.post('/login',authCtrl.postLogin);

router.get('/logout',authCtrl.logout);

router.get('/register',authCtrl.getRegister);
router.post('/register',userValidator.validateCreateUser(),authCtrl.PostRegister);

module.exports = router;
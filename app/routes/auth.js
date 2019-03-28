const express = require('express')
const router = express.Router();

const authCtrl = require('../controllers/auth');

router.get('/login',authCtrl.getLogin);
router.get('/register',authCtrl.getRegister);

module.exports = router;
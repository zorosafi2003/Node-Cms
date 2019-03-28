const express = require('express');
const router = express.Router();

const homeCtrl = require('../controllers/home');

router.get('/',homeCtrl.getHome);
router.get('/about',homeCtrl.getAbout);

module.exports = router;
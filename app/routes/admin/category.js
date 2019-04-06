const express = require('express');
const router = express.Router();

const categoryCtrl = require('../../controllers/admin/category');
const categoryValidator = require('../../validators/admin/category-validator');

router.all('/*',(req,res,next)=>{
    req.app.locals.layout = 'admin';
    next();
})

router.get('',categoryCtrl.getCategories);
router.post('/create',categoryValidator.validateCreateCategory(),categoryCtrl.createCategory);

router.get('/edit/:id',categoryCtrl.getEditCategory);
router.put('/edit/:id',categoryValidator.validateCreateCategory(),categoryCtrl.editCategory);

router.delete('/delete/:id',categoryCtrl.deleteCategory);

module.exports = router;
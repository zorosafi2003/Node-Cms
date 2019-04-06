const path = require("path");
const mongoose = require('mongoose');
const Category = mongoose.model('category');
const {validationResult} = require('express-validator/check');

module.exports.getCategories = (req, res, next) => {
    var errors = req.flash();
    Category.find().then(categoryArr=>{
        res.render('admin/categories/index',{categories:categoryArr,errors});
    }).catch(err=>{
        next(err);
    })
};

module.exports.createCategory = (req, res, next) => {
    var errors = validationResult(req);
    if(!errors.isEmpty())
    {
        req.flash('errors', errors.array());
        return    res.redirect('/admin/categories')
    }

    Category.create(req.body).then(category=>{
        res.redirect('/admin/categories');
    }).catch(err=>{
        next(err);
    })
};

module.exports.getEditCategory = (req, res, next) => {
   var categoryId = req.params.id;
   Category.findById(categoryId).then(category=>{
    res.render('admin/categories/edit',{category});
   });
}

module.exports.editCategory = (req, res, next) => {
    var errors = validationResult(req);
    if(!errors.isEmpty())
    {
        req.flash('errors', errors.array());
        return   res.redirect('/admin/categories')
    }

    var categoryId = req.params.id;
    Category.findById(categoryId).then(category=>{
        category.name = req.body.name;
       return category.save();
    }).then(()=>{
        res.redirect('/admin/categories')
    });
 }

 module.exports.deleteCategory = (req, res, next) => {
    var categoryId = req.params.id;
    Category.findById(categoryId).then((category)=>{
        category.remove();
        res.redirect('/admin/categories');
    });
 }
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
        res.redirect('/admin/categories')
    }
    Category.create(req.body).then(category=>{
        res.redirect('/admin/categories');
    }).catch(err=>{
        next(err);
    })
};

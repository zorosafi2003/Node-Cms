const { check } = require('express-validator/check');

module.exports.validateCreatePost = ()=>{
 return [
    check('title').not().isEmpty().withMessage('Title is not exists'),
    check('body').not().isEmpty().withMessage('Body is not exist')
 ]
}
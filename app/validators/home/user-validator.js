const { check } = require('express-validator/check');

module.exports.validateCreateUser = ()=>{
    return [
        check('firstName').not().isEmpty().withMessage('First Name is not exist'),
        check('lastName').not().isEmpty().withMessage('Last Name is not exists'),
        check('email').not().isEmpty().withMessage('Email is not exist'),
        check('password').not().isEmpty().withMessage('Password is not exist')
     ]
}
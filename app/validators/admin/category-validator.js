const {body} = require('express-validator/check');

module.exports.validateCreateCategory = ()=>{
    return [
        body('name').not().isEmpty().withMessage('Name is not exists')
    ]
}
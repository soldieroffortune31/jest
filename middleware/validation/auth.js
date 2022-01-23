const {check} = require('express-validator')



exports.register = [
    check('username').notEmpty().withMessage('nggak boleh kosong'),
    check('password').isLength({min: 6}).withMessage('min password length is 6')
]
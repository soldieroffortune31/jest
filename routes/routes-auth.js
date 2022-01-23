const express = require('express')
require('express-group-routes')
const app = express()
const {register} = require('../middleware/validation/auth')
const authController = require('./../controllers/authController')

app.group('/v1',  router => {
    router.post('/register', register, authController.register)
    router.get('/users', authController.getAll)
    router.get('/userspaginate', authController.getAllPagination)
})

module.exports = app
const express = require('express')
require('express-group-routes')
const app = express()
const profileController = require('./../controllers/profileController')

app.group('/',  router => {
    router.get('/', profileController.getDetailProfileByID)
    router.get('/:id', profileController.getDetailProfileByParamsID)
    router.put('/update', profileController.updateProfileByID)
})

module.exports = app
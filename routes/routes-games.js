const express = require('express')
require('express-group-routes')
const app = express()
const gamesController = require('../controllers/gameController')
const attachment = require('../middleware/upload/attachment')

app.group('/',  router => {
    router.post('/', gamesController.store)
    router.get('/detail/:id', gamesController.getDetail)
    router.put('/update/:id', gamesController.update)
    router.delete('/delete/:id', gamesController.delete)
    router.get('/list', gamesController.getAll)
})

app.group('/history',  router => {
    router.post('/add', gamesController.addHistory)
    // router.get('/detail/:id', gamesController.getDetail)
    // router.put('/update/:id', gamesController.update)
    // router.delete('/delete/:id', gamesController.delete)
    // router.get('/list', gamesController.getAll)
})

app.get('/leaderboard/:id', gamesController.showLeaderboard)
app.get('/leaderboardpaginate/:id', gamesController.showLeaderboardPaginate)
app.get('/leaderboard/cekgame/:id', gamesController.cekGame)

app.group('/attachment',  router => {
    router.post('/', attachment.single('file'), gamesController.attachment)
})


module.exports = app
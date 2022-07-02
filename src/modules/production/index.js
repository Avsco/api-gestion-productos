const { Router } = require('express')
const router = Router()

const { GET, SHOW, POST, PUT, DELETE} = require('./controllers')

router.get('/production', GET)
router.get('/production/:id', SHOW)
router.post('/production/:id', POST)
router.put('/production/:id', PUT)
router.delete('/production/:id', DELETE)
module.exports = router

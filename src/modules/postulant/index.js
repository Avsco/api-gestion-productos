const { Router } = require('express')
const router = Router()

const { GET, SHOW, POST, PUT, DELETE} = require('./controllers')

router.get('/postulants', GET)
router.get('/postulants/:id', SHOW)
router.post('/postulants', POST)
router.put('/postulants/:id', PUT)
router.delete('/postulants/:id', DELETE)
module.exports = router

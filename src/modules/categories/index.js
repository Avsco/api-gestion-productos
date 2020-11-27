const { Router } = require('express');
const router = Router()

const { GET, SHOW, POST, PUT, DELETE } = require('./controllers')

router.get('/categories', GET)
router.get('/categories/:id', SHOW)
router.post('/categories', POST)
router.put('/categories/:id', PUT)
router.delete('/categories/:id', DELETE)
module.exports = router
const { Router } = require('express');
const router = Router()

const { GET, SHOW, POST, PUT, DELETE, GETIMAGE } = require('./controllers')

router.get('/images', GET)
router.get('/images/:id', SHOW)
router.post('/products', POST)
router.put('/products/:id', PUT)
router.delete('/products/:id', DELETE)
//router.get('/image', GETIMAGE)
module.exports = router
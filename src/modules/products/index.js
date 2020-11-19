const { Router } = require('express');
const router = Router()

const { GET, SHOW, POST, PUT, DELETE } = require('./controllers')

router.get('/products', GET)
router.get('/products/:id', SHOW)
router.post('/products', POST)
router.put('/products/:id', PUT)
router.delete('/products/:id', DELETE)


router.get('/promociones', GET)

router.get('/descuentos', GET)
module.exports = router
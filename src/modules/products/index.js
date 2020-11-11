const { Router } = require('express');
const router = Router()

const { GET, SHOW, POST, PUT, DELETE, DISCOUNT, FILTER, PROMOS } = require('./controllers')

router.get('/products', GET)
router.get('/products/:id', SHOW)
router.post('/products', POST)
router.put('/products/:id', PUT)
router.delete('/products/:id', DELETE)
router.get('/productdiscounts', DISCOUNT)
router.get('/products/categoria/:categoria', FILTER)
router.get('/products/promotions/:id', PROMOS)
module.exports = router
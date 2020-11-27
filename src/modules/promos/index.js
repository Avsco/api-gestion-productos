const { Router } = require('express');
const router = Router()

const { GET, SHOW, IMAGE, PRODS, POST, DELETE } = require('./controllers')

router.get('/promotions', GET)
router.get('/promotions/:id', SHOW)
router.get('/promotions/image/:id', IMAGE)
router.get('/promotions/products/:id', PRODS)
router.post('/promotions',POST)
router.delete('/promotions/:id', DELETE)

module.exports = router
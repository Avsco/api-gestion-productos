const { Router } = require('express');
const router = Router()

const { GET, SHOW, POST, PUT, DELETE } = require('./controllers')

router.get('/discounts', GET)
router.get('/discounts/:id', SHOW)
router.post('/products', POST)
router.put('/discounts/:id', PUT)
router.delete('/discounts/:id', DELETE)
module.exports = router
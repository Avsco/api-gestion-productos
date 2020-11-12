const { Router } = require('express');
const router = Router()

const { GET, SHOW, IMAGE, PRODS } = require('./controllers')

router.get('/promotions', GET)
router.get('/promotions/:id', SHOW)
router.get('/promotions/image/:id', IMAGE)
router.get('/promotions/products/:id', PRODS)


module.exports = router
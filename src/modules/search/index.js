const { Router } = require('express');
const router = Router()

const { GET } = require('./controllers')

router.get('/search', GET)
module.exports = router
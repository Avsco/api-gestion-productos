const products = require('./products')
const images = require('./Images')
const promos = require('./promos')
const discounts = require('./discounts')

function router (app) {
    app.use(images)
    app.use(products)
    app.use(promos)
    app.use(discounts)
}

module.exports = router
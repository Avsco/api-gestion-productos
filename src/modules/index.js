const products = require('./products')
const images = require('./Images')
const promos = require('./promos')
const discounts = require('./discounts')
const search = require('./search')

function router (app) {
    app.use(images)
    app.use(products)
    app.use(promos)
    app.use(discounts)
    app.use(search)
}

module.exports = router
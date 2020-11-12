const products = require('./products')
const images = require('./Images')
const promos = require('./promos')

function router (app) {
    app.use(images)
    app.use(products)
    app.use(promos)
}

module.exports = router
const products = require('./products')

function router (app) {
    app.use(products)
}

module.exports = router
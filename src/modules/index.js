const products = require('./products')
const images = require('./images')

function router (app) {
    app.use(products,images)
}

module.exports = router
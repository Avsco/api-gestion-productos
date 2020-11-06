const products = require('./products')
const images = require('./Images')

function router (app) {
    app.use(images)
    app.use(products)
}

module.exports = router
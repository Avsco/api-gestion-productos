const products = require('./products')
const images = require('./Images')
const search = require('./search')

function router (app) {
    app.use(images)
    app.use(products)
    app.use(search)
}

module.exports = router
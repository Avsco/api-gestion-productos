const postulant = require('./postulant')
const production = require('./production')


function router(app) {
    app.use(postulant)
    app.use(production)

}

module.exports = router

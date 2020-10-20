const express = require('express')
// const path = require('path')

const port = process.env.PORT || 4000
const app = express()

const modules = require('./modules')
const morgan = require('morgan')

const init = async () => {
    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))
    
    if (process.env.NODE_ENV !== 'production')
        app.use(morgan('dev'))

    modules(app)

    // app.use(express.static(path.join(__dirname, '../public')))
    app.get('/favicon.ico', (req, res) => res.status(204));
    app.listen(port, () => console.log('Listening on http://localhost:' + port + '/'))
}

init()

module.exports = app
const express = require('express')
var cors = require('cors')
// const path = require('path')

const port = process.env.PORT || 4000
const app = express()

const modules = require('./modules')

const init = async () => {
    app.use(express.json({ limit: '5mb' }))
    app.use(express.urlencoded({ extended: false }))
    app.use(cors())
    
    modules(app)

    // app.use(express.static(path.join(__dirname, '../public')))
    app.get('/favicon.ico', (req, res) => res.status(204))
    app.listen(port, () => console.log('Listening on http://localhost:' + port + '/'))
}

init()

module.exports = app

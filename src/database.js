const { Pool } = require('pg')

const pool = new Pool({
    user: 'postgres',
    password: 'publica',
    host: 'localhost',
    port: 5432,
    database: 'subsistema2',
})

module.exports = pool
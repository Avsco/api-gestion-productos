const { Pool } = require('pg')

const pool = new Pool({
    user: 'postgres',
    password: 'zsecsq159357',
    host: 'localhost',
    port: 5432,
    database: 'gestion_productos',
})

module.exports = pool
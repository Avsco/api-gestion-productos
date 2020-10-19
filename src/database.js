const { Pool } = require('pg')

const pool = new Pool({
    user: 'user',
    password: '123456',
    host: 'localhost',
    port: 5432,
    database: 'gestion_productos',
})

module.exports = pool
const { Pool } = require('pg')

const pool = new Pool({
    user: 'postgres',
    password: 'postgres123',
    host: 'subsistema2.c14qiigfxarz.us-east-2.rds.amazonaws.com',
    port: 5432,
    database: 'subsistema2',
})

module.exports = pool

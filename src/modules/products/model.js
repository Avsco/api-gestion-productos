const pool = require('../../database')

async function getProduct(){
    return await pool.query(
        'SELECT * FROM products;'
    ).rows
}

async function getProductById(id){
    return await pool.query(
        'SELECT * FROM products WHERE id = $1',
        [id]
    ).rows
}

async function createProduct(name, price){
    return await pool.query(
        'INSERT INTO products (name, price) VALUES ($1, $2);',
        [name, price]
    ).rows
}

async function updateProduct(id, name, price){
    return await pool.query(
        'UPDATE users SET firstname = $1, secondname = $2, email = $3 WHERE id = $4;',
        [name, price, id]
    )
}

async function deleteProduct(id){
    return await pool.query(
        'DELETE FROM users WHERE id = $1;',
        [id])
}


module.exports = { 
    getProduct,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}

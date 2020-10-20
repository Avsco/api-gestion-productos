const { response } = require('express')
const pool = require('../../database')

async function getProduct(){
    const response = await pool.query(
        'SELECT * FROM products;'
    )
    return response.rows
}

async function getProductById(id){
    const response = await pool.query(
        'SELECT * FROM products WHERE id = $1',
        [id]
    )
    return response.rows
}

async function createProduct(name, price, description){
    const response =  await pool.query(
        'INSERT INTO products (name, price, description) VALUES ($1, $2, $3);',
        [name, price, description]
    )
    return response.command
}

async function updateProduct(id, name, price, description){
    const response = await pool.query(
        'UPDATE products SET name = $1, price = $2, description = $3 WHERE id = $4;',
        [name, price, description, id]
    )
    return response.command
}

async function deleteProduct(id){
    const response = await pool.query(
        'DELETE FROM products WHERE id = $1;',
        [id]
    )
    return response.command
}


module.exports = { 
    getProduct,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}

const { response } = require('express')
const pool = require('../../database')

async function getProduct(criterio,page,limit){

    if(criterio == ''){
        const response = await pool.query(
            "SELECT * FROM producto ORDER BY cod_prod;"
        )
        var result1 = response.rows
        
    }else{
        const response = await pool.query(
            "SELECT * FROM producto ORDER BY "+criterio+";"
        )
        
        var result1 = response.rows
          
    }
    
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const results = {}
    

    results.results = result1.slice(startIndex,endIndex)

    if(endIndex < result1.length ){
        results.next = {
            page: page + 1,
            limit : limit
        }
    }
    if(startIndex > 0){
        results.previus = {
            page: page - 1,
            limit : limit
       }
    }

    const ros = await pool.query(
        "SELECT count(*) FROM producto;"
    )
    
    results.cant = ros.rows



    return results
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

const { response } = require('express')
const pool = require('../../database')

async function getProduct(){
    const response = await pool.query(
        'SELECT * FROM producto;'
    )
    return response.rows
}

async function getProductById(cod_prod){
    const response = await pool.query(
        'SELECT * FROM producto WHERE cod_prod = $1',
        [cod_prod]
    )
    return response.rows
}

async function createProduct(nombre_prod, descripcion, precio_unid, peso, unidad_med, fecha_venc, cantidad){
    const response =  await pool.query(
        'INSERT INTO products (nombre_prod, descripcion, precio_unid, peso, unidad_med, fecha_venc, cantidad) VALUES ($1, $2, $3, $4, $5 $6, $7);',
        [nombre_prod, descripcion, precio_unid, peso, unidad_med, fecha_venc, cantidad]
    )
    return response.command
}
// falta aumentar fecha_adic por GETDATE();

async function updateProduct(nombre_prod, descripcion, precio_unid, peso, unidad_med, fecha_venc, cantidad){
    const response = await pool.query(
        'UPDATE products SET nombre_prod=$1, descripcion=$2, precio_unid=$3, peso=$4, unidad_med=$5, fecha_venc=$6, cantidad=$7;',
        [nombre_prod, descripcion, precio_unid, peso, unidad_med, fecha_venc, cantidad]
    )
    return response.command
}

async function deleteProduct(cod_prod){
    const response = await pool.query(
        'DELETE FROM producto WHERE cod_prod = $1;',
        [cod_prod]
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

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

async function categoryManage(categoria){
    const response = await pool.query(
        'INSERT INTO categoria (cod_admin, nombre_cat) SELECT 1, CAST($1 AS VARCHAR) WHERE NOT EXISTS (SELECT nombre_cat FROM categoria WHERE nombre_cat = $1);',
        [categoria]
    )
    return response.command
}

async function createProduct(nombre_prod, descripcion, categoria, precio_unid, cantidad, peso, unidad_med, fecha_venc){
    const response =  await pool.query(
    'INSERT INTO producto (cod_cat, nombre_prod, descripcion, precio_unid, cantidad, peso, unidad_med, fecha_venc, fecha_adic) SELECT c.cod_cat, $1, $2, $4, $5, $6, $7, $8, CURRENT_DATE FROM categoria c, producto p WHERE c.nombre_cat=$3 AND c.cod_cat=p.cod_cat;',
        [nombre_prod, descripcion, categoria, precio_unid, cantidad, peso, unidad_med, fecha_venc]
    )
    return response.command
}

async function updateProduct(nombre_prod, descripcion, precio_unid, peso, unidad_med, fecha_venc, cantidad){
    const response = await pool.query(
        'UPDATE producto SET nombre_prod=$1, descripcion=$2, precio_unid=$3, peso=$4, unidad_med=$5, fecha_venc=$6, cantidad=$7;',
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
    categoryManage,
    createProduct,
    updateProduct,
    deleteProduct
}

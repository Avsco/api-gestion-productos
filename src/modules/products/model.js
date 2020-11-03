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

async function getProductById(cod_prod,cantidad){
    const dat = await pool.query(
        'SELECT * FROM producto WHERE cod_prod = $1',
        [cod_prod]
    )
    response.datos=dat.rows

    if (cantidad==1)
    {

        const response2 = await pool.query(
            `select imagen 
            from imagen
            where cod_prod = $1
            order by num_pic limit 1`,
            [cod_prod]
        )
        response.imagenes=response2.rows

    }else{

        const response2 = await pool.query(
            `
            select imagen 
            from imagen
            where cod_prod = $1
            order by num_pic`,
            [cod_prod]
        )
        response.imagenes=response2.rows

       
    }

    return response
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
    /*'INSERT INTO producto (cod_cat, nombre_prod, descripcion, precio_unid, cantidad, peso, unidad_med, fecha_venc, fecha_adic) 
    SELECT c.cod_cat, $1, $2, $4, $5, $6, $7, $8, CURRENT_DATE FROM categoria c, producto p WHERE 
    c.nombre_cat=$3 AND c.cod_cat=p.cod_cat;',*/
    /*Arriba está la consulta sql que se usaba antes, pero el trigger no detectaba errrores, se hizo un cambio a la versión de
    abajo*/
    `insert into producto (cod_cat, nombre_prod, descripcion, precio_unid, cantidad, peso, unidad_med, fecha_venc,fecha_adic)
        values ((select cod_cat
        from categoria
        where nombre_cat=$3),$1,$2,$4,$5, $6, $7, $8,CURRENT_DATE); ` 

    ,
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

async function getImageById(id){
    const response = await pool.query(
        'SELECT I.imagen FROM imagen I WHERE I.cod_prod = $1 ORDER BY num_pic LIMIT 1',
        [id]
    )
    return response.rows
}

module.exports = { 
    getProduct,
    getProductById,
    categoryManage,
    createProduct,
    updateProduct,
    deleteProduct,
    getImageById
}

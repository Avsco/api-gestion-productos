const { response } = require('express')
const pool = require('../../database')

async function getProduct(expresion, criterio,page,limit){

    if(expresion) return await searchProducts(expresion)

    if(criterio == ''){
        const response = await pool.query(
            `SELECT * FROM producto where cantidad>'0' 
                and (fecha_venc>NOW()or fecha_venc is NULL) ORDER BY cod_prod;`,
        )
        var result1 = response.rows
        
    }else{


         if(criterio == 'fecha_adic'){
        const response = await pool.query(
            `select * from producto where cantidad>'0'
                and (fecha_venc>NOW()or fecha_venc is NULL) order by fecha_adic desc;`,
        )
        var result1 = response.rows
        
    }else{

        
        const response = await pool.query(
            `SELECT * FROM producto where cantidad>'0'
                and (fecha_venc>NOW()or fecha_venc is NULL) ORDER BY `+criterio+`;`,
        )
        
        var result1 = response.rows
          
    }
          
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

async function getProductById(cod_prod){ 
    const dat = await pool.query(
        `select uno.cod_prod, c.nombre_cat, nombre_prod,descripcion,
        precio_unid,peso,unidad_med,fecha_venc,fecha_adic,cantidad
        from (SELECT * FROM producto WHERE cod_prod = $1) as uno, categoria  c
        where c.cod_cat = uno.cod_cat;`,
        [cod_prod]
    )
    response.datos=dat.rows

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
    await pool.query(
    
    `insert into producto (cod_cat, nombre_prod, descripcion, precio_unid, cantidad, peso, unidad_med, fecha_venc,fecha_adic)
        values ((select cod_cat
        from categoria
        where nombre_cat=$3),$1,$2,$4,$5, $6, $7, $8,CURRENT_DATE); ` 

    ,
    [nombre_prod, descripcion, categoria, precio_unid, cantidad, peso, unidad_med, fecha_venc]
    )
    const id = await getIdByName(nombre_prod)
    return id
}

async function getIdByName(nombre_prod){
    const response = await pool.query(
        'select cod_prod from producto where nombre_prod = $1;',
        [nombre_prod]
    )
    return response.rows
}

async function updateProduct(cod_prod,nombre_prod, descripcion, precio_unid, peso, unidad_med, fecha_venc, cantidad){
    const response = await pool.query(
        'UPDATE producto SET nombre_prod=$2, descripcion=$3, precio_unid=$4, peso=$5, unidad_med=$6, fecha_venc=$7, cantidad=$8 WHERE cod_prod=$1;',
        [cod_prod, nombre_prod, descripcion, precio_unid, peso, unidad_med, fecha_venc, cantidad]
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

async function searchProducts(expresion){
    expresion = expresion.toLowerCase()
    const response = await pool.query(
        `SELECT nombre_prod 
        FROM producto 
        WHERE LOWER(nombre_prod) LIKE '${expresion}%' 
        AND (fecha_venc > NOW() or fecha_venc IS NULL)
        FETCH FIRST 10 ROWS ONLY;`
    )
    return response.rows
}

module.exports = { 
    getProduct,
    getProductById,
    categoryManage,
    createProduct,
    updateProduct,
    deleteProduct
}

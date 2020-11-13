const { response } = require('express')
const pool = require('../../database')

async function getPromotionById(cod_prom){
    const res=await pool.query(
        `select cod_prom, nombr_prom,descrip_prom, cantidad_prom, precio_prom, fecha_ini, fecha_fin
        from promocion
        where cod_prom=$1;`,
        [cod_prom]
    )
    response.datos=res.rows;
    return response;
}

async function getPromotions(criterio, page, limit){
    if(criterio == ''){
        const response = await pool.query(
            `SELECT * FROM promocion ORDER BY cod_prom;`,
        )
        var result1 = response.rows
        
    }else{
         if(criterio == 'fecha_adic'){
            const response = await pool.query(
                `select * from promocion order by fecha_inic desc;`,
            )
        var result1 = response.rows
        
        }else{
            const response = await pool.query(
                `SELECT * FROM producto ORDER BY `+criterio+`;`,
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
        "SELECT count(*) FROM promocion;"
    )
    
    results.cant = ros.rows

    return results
}

async function getPromotionImage(cod_prom){
    const res=await pool.query(
        `select imagen_prom
        from promocion
        where cod_prom=$1`,
        [cod_prom]
    )
    response.datos=res.rows;
    return response;
}

async function getProductsForPromotion (cod_prom){
    const res = await pool.query(
        `select p.nombre_prod, p.precio_unid
        from producto p, prod_prom c
        where c.cod_prom=$1 and c.cod_prod=p.cod_prod;`,
        [cod_prom]
    )
    response.datos=res.rows
    return response
}

module.exports = {
    getPromotionById,
    getPromotions,
    getPromotionImage,
    getProductsForPromotion
}
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

async function getPromotions(){
    const res=await pool.query(
        `select cod_prom, nombr_prom,descrip_prom, cantidad_prom, precio_prom, fecha_ini, fecha_fin
        from promocion;`
    )
    response.datos=res.rows;
    return response;
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
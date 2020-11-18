const pool = require('../../database')

async function search(expresion, table, page, limit){
    expresion = expresion.toLowerCase()
    page = (page - 1) * limit
    const response = {}
    try {
        if(table === 'producto')
            response.results = await searchProducts(expresion, page, limit)
        else if(table === 'descuento')
            response.results = await searchDiscounts(expresion, page, limit)
        else if(table === 'promocion')
            response.results = await searchPromotions(expresion, page, limit)
        else
            throw new Error('The table not exist')
            
        response.cant = await countRows(table, expresion)
        return response
    } catch (error) {
        throw new Error(error)
    }
}

async function searchProducts(expresion, page, limit){
    const response = await pool.query(
        `SELECT * 
        FROM producto 
        WHERE LOWER(nombre_prod) LIKE '%${expresion}%' 
        AND (fecha_venc > NOW() OR fecha_venc IS NULL)
        LIMIT $1 OFFSET $2;`,
        [limit, page]
    )
    return response.rows
}

async function searchDiscounts(expresion, page, limit){
    const response = await pool.query(
        `SELECT *
        FROM descuento, (SELECT cod_prod, nombre_prod, descripcion, precio_unid, fecha_adic
            FROM producto 
            WHERE LOWER(nombre_prod) LIKE '%${expresion}%'
            AND (fecha_venc > NOW() OR fecha_venc IS NULL)) as UNO
        WHERE UNO.cod_prod = descuento.cod_prod
        LIMIT $1 OFFSET $2;`,
        [limit, page]
    )
    return response.rows
}

async function searchPromotions(expresion, page, limit){
    const response = await pool.query(
        `SELECT DISTINCT promocion.cod_prom, promocion.nombr_prom
        FROM promocion, (SELECT cod_prom
            FROM prod_prom, (SELECT cod_prod
                FROM producto 
                WHERE LOWER(nombre_prod) LIKE '%${expresion}%'
                AND (fecha_venc > NOW() OR fecha_venc IS NULL)) as UNO
            WHERE UNO.cod_prod = prod_prom.cod_prod) as DOS
        WHERE DOS.cod_prom = promocion.cod_prom
        LIMIT $1 OFFSET $2;`,
        [limit, page]
    )
    return response.rows
}

async function countRows(nameTable, expresion) {
   if(nameTable == 'promocion') 
    return countPromotions(expresion)
   else if(nameTable == 'descuento') 
    return countDiscounts(expresion)
   else if(nameTable == 'producto') 
    return countProducts(expresion)
}

async function countPromotions(expresion){
    const response = await pool.query(
        `SELECT DISTINCT count(*)
        FROM promocion, (SELECT cod_prom
            FROM prod_prom, (SELECT cod_prod
                FROM producto 
                WHERE LOWER(nombre_prod) LIKE '%${expresion}%'
                AND (fecha_venc > NOW() OR fecha_venc IS NULL)) as UNO
            WHERE UNO.cod_prod = prod_prom.cod_prod) as DOS
        WHERE DOS.cod_prom = promocion.cod_prom;`
    )
    return response.rows
}

async function countDiscounts(expresion){
    const response = await pool.query(
        `SELECT count(*)
        FROM descuento, (SELECT cod_prod
            FROM producto 
            WHERE LOWER(nombre_prod) LIKE '%${expresion}%'
            AND (fecha_venc > NOW() OR fecha_venc IS NULL)) as UNO
        WHERE UNO.cod_prod = descuento.cod_prod;`
    )
    return response.rows
}

async function countProducts(expresion){
    const response = await pool.query(
        `SELECT count(*) 
        FROM producto 
        WHERE LOWER(nombre_prod) LIKE '%${expresion}%' 
        AND (fecha_venc > NOW() OR fecha_venc IS NULL);`
    )
    return response.rows
}

module.exports = { 
    search
}
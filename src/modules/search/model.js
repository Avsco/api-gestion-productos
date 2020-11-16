const pool = require('../../database')

async function search(expresion, table, page, limit){
    try {
        const response = {}
        if(table === 'producto')
            response.results = await searchProducts(expresion, page, limit)
        else if(table === 'descuento')
            response.results = await searchDiscounts(expresion, page, limit)
        else if(table === 'promocion')
            response.results = await searchPromotions(expresion, page, limit)
        else
            throw new Error('The table not exist')
            
        response.cant = await countRows(table)
        return response
    } catch (error) {
        throw new Error(error)
    }
}

async function searchProducts(expresion, page, limit){
    expresion = expresion.toLowerCase()
    page = (page - 1) * limit
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
    expresion = expresion.toLowerCase()
    page = (page - 1) * limit
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

async function searchPromotions(expresion, page, limit){}

async function countRows(nameTable) {
    const response = await pool.query(
        `SELECT count(*) from ${nameTable}`
    )
    return response.rows
}

module.exports = { 
    search
}
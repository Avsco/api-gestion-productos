const pool = require('../../database')

async function search(expresion, table, page, limit){
    console.log(table);
    const response = {}
    if(table === 'producto')
        response.results = await searchProducts(expresion, page, limit)
    else if(table === 'descuento')
        response.results = await searchDiscounts(expresion, page, limit)
    else if(table === 'promocion')
        response.results = await searchPromotions(expresion, page, limit)
    response.cant = await countRows(table)
    return response
}

async function searchProducts(expresion, page, limit){
   expresion = expresion.toLowerCase()
    page = (page - 1) * limit
    const response = await pool.query(
        `SELECT nombre_prod 
        FROM producto 
        WHERE LOWER(nombre_prod) LIKE '%${expresion}%' 
        AND (fecha_venc > NOW() or fecha_venc IS NULL)
        LIMIT $1 OFFSET $2;`,
        [limit, page]
    )
    return response.rows
}

async function countRows(nameTable) {
    const response = await pool.query(
        `SELECT count(*) from ${nameTable}`
    )
    return response.rows
}

async function searchDiscounts(expresion, page, limit){}

async function searchPromotions(expresion, page, limit){}

module.exports = { 
    search
}
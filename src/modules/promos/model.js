const { response } = require('express')
const pool = require('../../database')

async function getPromotionById(cod_prom) {
    const res = await pool.query(
        `select cod_prom, nombr_prom,descrip_prom, cantidad_prom, precio_prom, fecha_ini, fecha_fin
        from promocion
        where cod_prom=$1;`,
        [cod_prom]
    )
    const datos = await pool.query(
        `select *
        from prod_prom
        where prod_prom.cod_prom=$1`,
        [cod_prom]
    )
    response.datos = res.rows 
    response.prod =  datos.rows
    return response
}

async function updatePromotion(cod_prom,nombr_prom,descrip_prom,cantidad_prom,precio_prom,fecha_ini,fecha_fin,imagen_prom) {
    const res = await pool.query(
        'UPDATE promocion SET nombr_prom=$2, descrip_prom=$3, cantidad_prom=$4, precio_prom=$5, fecha_ini=$6, fecha_fin=$7, imagen_prom=$8 WHERE cod_prom=$1;',
        [cod_prom, nombr_prom, descrip_prom, cantidad_prom, precio_prom, fecha_ini, fecha_fin, imagen_prom,]
    )
    return response.command
}

async function deletePromotionById(cod_prom) {
    const res = await pool.query(`delete from promocion where cod_prom=$1;`, [cod_prom])
    response.datos = res.rows
    return response
}

async function deletePromotionsProductsById(cod_prom) {
    const res = await pool.query(`delete from prod_prom where cod_prom=$1;`, [cod_prom])
    response.datos = res.rows
    return response
}

async function getPromotionsClient(criterio, page, limit) {
    var query = `SELECT cod_prom, nombr_prom,descrip_prom, cantidad_prom, precio_prom, fecha_ini, fecha_fin 
    FROM promocion WHERE (cantidad_prom>'0')and(fecha_fin>NOW())`
    if (criterio == '') {
        const response = await pool.query(query + ` ORDER BY cod_prom;`)
        var result1 = response.rows
    } else {
        if (criterio == 'fecha_ini') {
            const response = await pool.query(query + ` order by fecha_ini desc`)
            var result1 = response.rows
        } else {
            const response = await pool.query(query + ` ORDER BY ` + criterio + `;`)
            var result1 = response.rows
        }
    }
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const results = {}

    results.results = result1.slice(startIndex, endIndex)

    if (endIndex < result1.length) {
        results.next = {
            page: page + 1,
            limit: limit,
        }
    }
    if (startIndex > 0) {
        results.previus = {
            page: page - 1,
            limit: limit,
        }
    }

    const ros = await pool.query(
        "SELECT count(*) FROM promocion where (cantidad_prom>'0')and(fecha_fin>NOW());"
    )

    results.cant = ros.rows

    return results
}

async function getPromotions(criterio, page, limit) {
    var query = `SELECT cod_prom, nombr_prom,descrip_prom, cantidad_prom, precio_prom, fecha_ini, fecha_fin 
    FROM promocion`
    if (criterio == '') {
        const response = await pool.query(query + ` ORDER BY cod_prom;`)
        var result1 = response.rows
    } else {
        if (criterio == 'fecha_inic') {
            const response = await pool.query(query + ` order by fecha_ini desc`)
            var result1 = response.rows
        } else {
            const response = await pool.query(query + ` ORDER BY ` + criterio + `;`)
            var result1 = response.rows
        }
    }
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const results = {}

    results.results = result1.slice(startIndex, endIndex)

    if (endIndex < result1.length) {
        results.next = {
            page: page + 1,
            limit: limit,
        }
    }
    if (startIndex > 0) {
        results.previus = {
            page: page - 1,
            limit: limit,
        }
    }

    const ros = await pool.query('SELECT count(*) FROM promocion;')

    results.cant = ros.rows

    return results
}

async function getPromotionImage(cod_prom) {
    const res = await pool.query(
        `select imagen_prom
        from promocion
        where cod_prom=$1`,
        [cod_prom]
    )
    response.datos = res.rows
    return response
}

async function getProductsForPromotion(cod_prom) {
    const res = await pool.query(
        `select p.nombre_prod, p.precio_unid, p.cod_prod
        from producto p, prod_prom c
        where c.cod_prom=$1 and c.cod_prod=p.cod_prod;`,
        [cod_prom]
    )
    response.datos = res.rows
    return response
}

async function createPromotion(
    nombr_prom,
    descrip_prom,
    cantidad_prom,
    precio_prom,
    fecha_ini,
    fecha_fin,
    imagen_prom
) {
    const res = await pool.query(
        `INSERT INTO promocion(
            nombr_prom, descrip_prom, cantidad_prom, precio_prom, fecha_ini, fecha_fin, imagen_prom)
            VALUES ($1, $2, $3, $4, $5, $6, $7);`,
        [nombr_prom, descrip_prom, cantidad_prom, precio_prom, fecha_ini, fecha_fin, imagen_prom]
    )
    const idProm = await getNewProm(nombr_prom)
    return idProm
}

async function getNewProm(nombr_prom) {
    const res = await pool.query(`select cod_prom from promocion where nombr_prom=$1;`, [
        nombr_prom,
    ])
    return res.rows[0].cod_prom
}

async function addProductsToProm(idProm, products) {
    for (const key in products) {
        if (products.hasOwnProperty(key)) {
            const element = products[key]
            await pool.query(
                `insert into prod_prom(cod_prod, cod_prom, cant_prod) values($1,$2,$3);`,
                [key, idProm, element[0]]
            )
        }
    }
}

async function deleteProductsFromProm(idProm) {
    await pool.query(`DELETE FROM prod_prom where cod_prom=$1;`, [idProm])
    return response.command
}

module.exports = {
    getPromotionById,
    getPromotionsClient,
    getPromotions,
    getPromotionImage,
    getProductsForPromotion,
    createPromotion,
    addProductsToProm,
    deletePromotionById,
    deletePromotionsProductsById,
    updatePromotion,
    deleteProductsFromProm
}

const { response } = require('express')
const pool = require('../../database')

async function getDiscountClient(criterio, categoria, page, limit) {
    console.log('entre al metodo con el criterio ' + criterio)

    var query = `SELECT * FROM producto p, descuento d
    where d.cod_prod=p.cod_prod and (cantidad>0) and(fecha_venc is null or fecha_venc>NOW())`
    if (categoria == '') {
        if (criterio == '') {
            const response = await pool.query(query + ` ORDER BY p.cod_prod;`)
            var result1 = response.rows
        } else {
            if (criterio == 'fecha_adic') {
                const response = await pool.query(query + ` ORDER BY p.fecha_adic desc;`)
                var result1 = response.rows
            } else {
                const response = await pool.query(query + ` ORDER BY p.` + criterio + `;`)
                var result1 = response.rows
            }
        }
    } else {
        query = query + ` and p.cod_cat in (SELECT cod_cat from categoria where nombre_cat=$1)`
        if (criterio == '') {
            const response = await pool.query(query + ` ORDER BY p.cod_prod;`, [categoria])
            var result1 = response.rows
        } else {
            if (criterio == 'fecha_adic') {
                const response = await pool.query(query + ` ORDER BY p.fecha_adic desc;`, [
                    categoria,
                ])
                var result1 = response.rows
            } else {
                const response = await pool.query(query + ` ORDER BY p.` + criterio + `;`, [
                    categoria,
                ])
                var result1 = response.rows
            }
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

    let ros

    ros = { rows: [{ count: result1.length }] }

    results.cant = ros.rows

    return results
}

async function getDiscount(criterio, categoria, page, limit) {
    var query = `SELECT p.* FROM producto p,(select cod_prod from descuento ) 
    as uno where (uno.cod_prod=p.cod_prod)`
    if (categoria == '') {
        if (criterio == '') {
            const response = await pool.query(query + ` ORDER BY cod_prod;`)
            var result1 = response.rows
        } else {
            if (criterio == 'fecha_adic') {
                const response = await pool.query(query + ` ORDER BY fecha_adic desc;`)
                var result1 = response.rows
            } else {
                const response = await pool.query(query + ` ORDER BY ` + criterio + `;`)
                var result1 = response.rows
            }
        }
    } else {
        query = query + ` and p.cod_cat in (SELECT cod_cat from categoria where nombre_cat=$1)`
        if (criterio == '') {
            const response = await pool.query(query + ` ORDER BY cod_prod;`, [categoria])
            var result1 = response.rows
        } else {
            if (criterio == 'fecha_adic') {
                const response = await pool.query(query + ` ORDER BY fecha_adic desc;`, [categoria])
                var result1 = response.rows
            } else {
                const response = await pool.query(query + ` ORDER BY ` + criterio + `;`, [
                    categoria,
                ])
                var result1 = response.rows
            }
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

    let ros

    ros = { rows: [{ count: result1.length }] }

    results.cant = ros.rows

    return results
}

async function getDiscountById(cod_prod) {
    const dat = await pool.query(
        `select d.cod_prod, d.porcentaje, d.cantidad_req, p.precio_unid from descuento d, producto p where d.cod_prod=p.cod_prod and p.cod_prod=$1`,
        [cod_prod]
    )
    response.datos = dat.rows

    return response
}

async function createDiscount(cod_prod, porcentaje, cant_req) {
    const response = await pool.query(
        `insert into descuento values ($1,$2,$3); `,

        [cod_prod, porcentaje, cant_req]
    )
    return response.command
}

async function updateDiscount(cod_prod, porcentaje, cantidad_req) {
    const response = await pool.query(
        'update descuento set porcentaje=$2, cantidad_req = $3 where cod_prod=$1',
        [cod_prod, porcentaje, cantidad_req]
    )
    return response.command
}

async function deleteDiscount(cod_prod) {
    const response = await pool.query('DELETE FROM descuento WHERE cod_prod = $1;', [cod_prod])
    return response.command
}

module.exports = {
    getDiscountClient,
    getDiscount,
    getDiscountById,
    createDiscount,
    updateDiscount,
    deleteDiscount,
}

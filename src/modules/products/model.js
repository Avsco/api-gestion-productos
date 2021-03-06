const { response } = require('express')
const pool = require('../../database')

async function getProductClient(criterio, categoria, page, limit) {
    var query = 
    `SELECT producto.cod_prod,cod_cat,nombre_prod,descripcion,precio_unid,peso,
    unidad_med,fecha_venc,fecha_adic,cantidad,porcentaje,cantidad_req
    FROM producto
    LEFT JOIN descuento
    ON producto.cod_prod = descuento.cod_prod
    where (producto.cantidad>'0' or producto.cantidad is null) and (fecha_venc>NOW()or fecha_venc is NULL)`
    
    if (categoria == '') {
        if (criterio == '') {
            const response = await pool.query(
                query + ` ORDER BY producto.cod_prod;`
            )
            var result1 = response.rows
        } else {
            if (criterio == 'fecha_adic') {
                const response = await pool.query(
                    query + ` ORDER BY producto.fecha_adic desc;`
                )
                var result1 = response.rows
            } else {
                const response = await pool.query(
                    query + ` ORDER BY producto.` + criterio + `;`,
                )
                var result1 = response.rows
            }
        }

    } else {

        query = query + ` and cod_cat IN (SELECT cod_cat from categoria where nombre_cat=$1)`
        if (criterio == '') {
            const response = await pool.query(
                query + ` ORDER BY producto.cod_prod;`,
                [categoria]
            )
            var result1 = response.rows
        } else {
            if (criterio == 'fecha_adic') {
                const response = await pool.query(
                    query + ` order by fecha_adic desc`,
                    [categoria]
                )
                var result1 = response.rows
            } else {
                const response = await pool.query(
                    query + `  order by ` + criterio + ``, [categoria]
                )
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
            limit: limit
        }
    }
    if (startIndex > 0) {
        results.previus = {
            page: page - 1,
            limit: limit
        }
    }

    let ros


    ros = { rows: [{ count: result1.length }] };

    results.cant = ros.rows

    return results
}

async function getProduct(criterio, categoria, page, limit, filter) {
    var query
    if (filter == 1) {
        query = `SELECT * FROM producto where cantidad>'0' and (fecha_venc>NOW()or fecha_venc is NULL) ORDER BY ` + criterio
        if (criterio == 'fecha_adic') {
            const response = await pool.query(
                query + ` DESC;`,
            )
            var result1 = response.rows
        } else {
            const response = await pool.query(
                query + `;`,
            )
            var result1 = response.rows
        }

    } else

    {
        query = 
        `SELECT producto.cod_prod,cod_cat,nombre_prod,descripcion,precio_unid,peso,
        unidad_med,fecha_venc,fecha_adic,cantidad,porcentaje,cantidad_req
        FROM producto
        LEFT JOIN descuento
        ON producto.cod_prod = descuento.cod_prod`
        if (categoria == '') {
            if (criterio == '') {
                const response = await pool.query(
                    query + ` ORDER BY producto.cod_prod;`,
                )
                var result1 = response.rows

            } else {
                if (criterio == 'fecha_adic') {
                    const response = await pool.query(
                        query + ` ORDER BY producto.fecha_adic desc;`,
                    )
                    var result1 = response.rows

                } else {
                    const response = await pool.query(
                        query +` ORDER BY producto.` + criterio + `;`,
                    )
                    var result1 = response.rows
                }
            }

        } else {

            query = query + ` where cod_cat IN (SELECT cod_cat from categoria where nombre_cat=$1)`
            if (criterio == '') {
                const response = await pool.query(
                    query + ` ORDER BY producto.cod_prod;`, [categoria]
                )
                var result1 = response.rows

            } else {
                if (criterio == 'fecha_adic') {
                    const response = await pool.query(
                       query + `  order by fecha_adic desc`, [categoria]
                    )
                    var result1 = response.rows

                } else {
                    const response = await pool.query(
                       query + ` order by ` + criterio + `;`, [categoria]
                    )
                    var result1 = response.rows
                }
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
            limit: limit
        }
    }
    if (startIndex > 0) {
        results.previus = {
            page: page - 1,
            limit: limit
        }
    }

    let ros


    ros = { rows: [{ count: result1.length }] };

    results.cant = ros.rows

    return results
}

async function getProductById(cod_prod) {
    const dat = await pool.query(
        `select uno.cod_prod, c.nombre_cat, nombre_prod,descripcion,
        precio_unid,peso,unidad_med,fecha_venc,fecha_adic,cantidad
        from (SELECT * FROM producto WHERE cod_prod = $1) as uno, categoria  c
        where c.cod_cat = uno.cod_cat;`, [cod_prod]
    )
    response.datos = dat.rows

    return response
}

async function getProductsWithDiscount() {
    const res = await pool.query(
        `select p.nombre_prod, p.precio_unid, p.descripcion
        from producto p, descuento d
        where p.cod_prod=d.cod_prod;`
    )
    response.datos = res.rows
    return response
}

async function getPromotionsForProduct(cod_prod) {
    const res = await pool.query(
        `select p.nombr_prom, p.cod_prom 
        from promocion p, prod_prom c
        where c.cod_prod=$1 and c.cod_prom=p.cod_prom;`, [cod_prod]
    )
    response.datos = res.rows
    return response
}

async function categoryManage(categoria) {
    const response = await pool.query(
        'INSERT INTO categoria (cod_admin, nombre_cat) SELECT 1, CAST($1 AS VARCHAR) WHERE NOT EXISTS (SELECT nombre_cat FROM categoria WHERE nombre_cat = $1);', [categoria]
    )
    return response.command
}

async function createProduct(nombre_prod, descripcion, categoria, precio_unid, cantidad, peso, unidad_med, fecha_venc) {
    await pool.query(

        `insert into producto (cod_cat, nombre_prod, descripcion, precio_unid, cantidad, peso, unidad_med, fecha_venc,fecha_adic)
        values ((select cod_cat
        from categoria
        where nombre_cat=$3),$1,$2,$4,$5, $6, $7, $8,CURRENT_DATE); `

        , [nombre_prod, descripcion, categoria, precio_unid, cantidad, peso, unidad_med, fecha_venc]
    )
    const id = await getIdByName(nombre_prod)
    return id
}

async function getIdByName(nombre_prod) {
    const response = await pool.query(
        'select cod_prod from producto where nombre_prod = $1;', [nombre_prod]
    )
    return response.rows
}

async function updateProduct(cod_prod, nombre_prod, descripcion,categoria, precio_unid, peso, unidad_med, fecha_venc, cantidad) {
    const response = await pool.query(
        `UPDATE producto SET cod_cat=(select cod_cat from categoria where nombre_cat=$4), 
        nombre_prod=$2, descripcion=$3, precio_unid=$5, peso=$6, unidad_med=$7, fecha_venc=$8, cantidad=$9 
        WHERE cod_prod=$1`, 
        [cod_prod, nombre_prod, descripcion, categoria, precio_unid, peso, unidad_med, fecha_venc, cantidad]
    )
    return response.command
}

async function deleteProduct(cod_prod) {
    const response = await pool.query('DELETE FROM producto WHERE cod_prod = $1;', [cod_prod])
    return response.command
}

async function deleteImageFromProduct(cod_prod) {
    const response = await pool.query('DELETE FROM imagen WHERE cod_prod = $1;', [cod_prod])
    return response.command
}

async function deleteProductsDiscounts(cod_prod) {
    const response = await pool.query('DELETE FROM descuento WHERE cod_prod = $1;', [cod_prod])
    return response.command
}

async function deleteProductsFromPromotions() {
  
        const response = await pool.query('delete from promocion where cod_prom not in (SELECT cod_prom FROM prod_prom);')
    
    return response.command
}

async function deleteFromIntermediateTable(cod_prod) {
    
        const response = await pool.query(
            'DELETE FROM prod_prom  WHERE cod_prom IN (SELECT cod_prom FROM prod_prom where cod_prod = $1);',[cod_prod])
    
    return response.command
}

module.exports = {
    getProduct,
    getProductClient,
    getProductById,
    categoryManage,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductsWithDiscount,
    getPromotionsForProduct,
    deleteImageFromProduct,
    deleteProductsDiscounts,
    deleteFromIntermediateTable,
    deleteProductsFromPromotions,
}

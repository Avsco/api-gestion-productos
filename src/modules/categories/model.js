const { response } = require('express')
const pool = require('../../database')

async function getCategory() {
    const response = await pool.query(`select nombre_cat,cod_cat from categoria`)
    var result1 = response.rows

    return result1
}

async function getCategoryById(cod_prod) {
    const dat = await pool.query(`select * from categoria where cod_cat=$1`, [cod_prod])
    response.datos = dat.rows

    return response
}

async function createCategory(nombre_cat) {
    const response = await pool.query(
        `insert into categoria(cod_admin,nombre_cat) values (1,$1); `,

        [nombre_cat]
    )
    return response.command
}

async function updateCategory(cod_cat, nombre_cat) {
    const response = await pool.query('update categoria set nombre_cat=$2 where cod_cat=$1', [
        cod_cat,
        nombre_cat,
    ])
    return response.command
}

async function deleteCategory(cod_cat) {
    const response = await pool.query('DELETE FROM categoria WHERE cod_cat = $1;', [cod_cat])
    return response.command
}

module.exports = {
    getCategory,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
}

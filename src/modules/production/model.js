const { response } = require('express')
const pool = require('../../database')

async function Replace(cadenaDatos,tamano){
    
    for(let i=0;i<tamano;i++){
        const date = new Date(cadenaDatos[i].fechanacpostulante);
        let nuevaFecha = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()
        cadenaDatos[i].fechanacpostulante = nuevaFecha
    }
    return cadenaDatos

}

async function getProduction() {
    const data= await pool.query(
        `select * from produccion;`
    )   
    response.datos = data.rows

    return response
}

async function getProductionById(idProduccion) {
    const data = await pool.query(
        `select * from produccion where idproduccion = $1;`, [idProduccion]
    )
    response.datos = data.rows

    return response
}

async function postProduction(cod_postulante,tituloProduccion,anoProduccion,idiomaProduccion,urlProduccion,paisProduccion) {
    const response = await pool.query(
        `insert into produccion(idpostulante, tituloproduccion, anoproduccion, 
            idiomaproduccion, urlprouduccion, paisproduccion) 
            values ($1,$2,$3,$4,$5,$6);`, 
            [cod_postulante,tituloProduccion,anoProduccion,idiomaProduccion,urlProduccion,paisProduccion]
    )
    return response.command
}

async function updateProduction(cod_produccion,tituloProduccion,anoProduccion,idiomaProduccion,urlProduccion,paisProduccion) {
    const response = await pool.query(
        `UPDATE produccion SET 
        tituloproduccion=$2, anoproduccion=$3, idiomaproduccion=$4, urlprouduccion=$5, paisproduccion=$6
        WHERE idproduccion=$1`, 
        [cod_produccion, tituloProduccion,anoProduccion,idiomaProduccion,urlProduccion,paisProduccion]
    )
    return response.command
}

async function deleteProduction(cod_produccion) {
    const response = await pool.query('DELETE FROM produccion WHERE idproduccion = $1;', [cod_produccion])
    return response.command
}

module.exports = {
    getProduction,
    getProductionById,
    postProduction,
    updateProduction,
    deleteProduction
}

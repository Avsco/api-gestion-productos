const { response } = require('express')
const pool = require('../../database')

async function getDiscount(criterio,page,limit){

    if(criterio == ''){
        const response = await pool.query(
            `SELECT p.* FROM producto p,(select cod_prod from descuento ) 
            as uno where uno.cod_prod=p.cod_prod ORDER BY cod_prod;`,
        )
        var result1 = response.rows
        
    }else{


         if(criterio == 'fecha_adic'){
        const response = await pool.query(
            `SELECT p.* FROM producto p,(select cod_prod from descuento ) as uno where uno.cod_prod=p.cod_prod 
            ORDER BY fecha_adic desc;`,
        )
        var result1 = response.rows
        
    }else{

        
        const response = await pool.query(
            `
            SELECT p.* FROM producto p,(select cod_prod from descuento ) as uno where uno.cod_prod=p.cod_prod 
            ORDER BY `+criterio+`;`,
            
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
        "SELECT count(*) FROM descuento;"
    )
    
    results.cant = ros.rows

    return results
}

async function getDiscountById(cod_prod){ 
    const dat = await pool.query(
        `select * from descuento where cod_prod=$1`,
        [cod_prod]
    )
    response.datos=dat.rows

    return response
}


async function createDiscount(cod_prod, porcentaje, cant_req){
    await pool.query(
    
    `insert into descuento values ($1,$2,$3); ` 

    ,
    [cod_prod, porcentaje, cant_req]
    )
    const id = await getIdByName(nombre_prod)
    return id
}

async function getIdByName(nombre_prod){
    const response = await pool.query(
        'select cod_prod from producto where nombre_prod = $1;',
        [nombre_prod]
    )
    return response.rows
}

async function updateDiscount(cod_prod, porcentaje, cantidad_req){
    const response = await pool.query(
        'update descuento set porcentaje=$2, cantidad_req = $3 where cod_prod=$1',
        [cod_prod, porcentaje, cantidad_req]
    )
    return response.command
}

async function deleteDiscount(cod_prod){
    const response = await pool.query(
        'DELETE FROM descuento WHERE cod_prod = $1;',
        [cod_prod]
    )
    return response.command
}


module.exports = { 
    getDiscount,
    getDiscountById,
    createDiscount,
    updateDiscount,
    deleteDiscount
}

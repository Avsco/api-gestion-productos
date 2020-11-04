const { response } = require('express')
const pool = require('../../database')

async function getImage(criterio,page,limit){

    if(criterio == ''){
        const response = await pool.query(
            "select * from imagen order by cod_prod;"
        )
        var result1 = response.rows
        
    }else{
        const response = await pool.query(
            "SELECT * FROM imagen ORDER BY "+criterio+";"
        )
        
        var result1 = response.rows
          
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
        "select count(*) from imagen;"
    )
    
    results.cant = ros.rows

    return results
}

async function getImageById(cod_prod,cantidad){
    
    if (cantidad==1)
    {
        const response2 = await pool.query(
            `select imagen 
            from imagen where cod_prod = $1
            order by num_pic limit 1`,
            [cod_prod]
        )
        response.datos=response2.rows

    }else{

        const response2 = await pool.query(
            `select imagen 
            from imagen where cod_prod = $1
            order by num_pic`,
            [cod_prod]
        )
        response.datos=response2.rows

       
    }

    return response
}


async function createImage(cod_prod,imagen){
    const response =  await pool.query(
    `insert into imagen (cod_prod,imagen) values ((select cod_prod from producto where cod_prod=$1),$2); `,
    [cod_prod,imagen]
    )
    return response.command
}

async function updateProduct(nombre_prod, descripcion, precio_unid, peso, unidad_med, fecha_venc, cantidad){
    const response = await pool.query(
        'UPDATE producto SET nombre_prod=$1, descripcion=$2, precio_unid=$3, peso=$4, unidad_med=$5, fecha_venc=$6, cantidad=$7;',
        [nombre_prod, descripcion, precio_unid, peso, unidad_med, fecha_venc, cantidad]
    )
    return response.command
}

async function deleteProduct(cod_prod){
    const response = await pool.query(
        'DELETE FROM producto WHERE cod_prod = $1;',
        [cod_prod]
    )
    return response.command
}



module.exports = { 
    getImage,
    getImageById,
    createImage,
    updateProduct,
    deleteProduct,
    
}

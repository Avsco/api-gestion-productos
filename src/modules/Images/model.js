const { response } = require('express')
const pool = require('../../database')


async function getImageById1(cod_prod){
    
    const response2 = await pool.query(
        `select imagen 
        from imagen where cod_prod = $1
        order by num_pic limit 1`,
        [cod_prod]
    )
    response.datos=response2.rows

return response
}
async function getImageByIdAll(cod_prod,cantidad){
if(cantidad){
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


async function createImage(cod_prod,imagen2){
    const response =  await pool.query(
    `insert into imagen (cod_prod,imagen) values ((select cod_prod from producto where cod_prod=$1),$2); `,
    [cod_prod,imagen2]
    )
    return response.command
}

async function updateImage(cod_prod,num_pic,imagen){
    const response = await pool.query(
        'UPDATE imagen  SET imagen=$3 where cod_prod = $1 and num_pic = $2;',
        [cod_prod,num_pic,imagen ]
    )
    return response.command
}

async function deleteImage(cod_prod,num_pic){
    const response = await pool.query(
        'DELETE FROM imagen WHERE cod_prod = $1 and num_pic = $2;',
        [cod_prod,num_pic]
    )
    return response.command
}



module.exports = { 
    getImageByIdAll,
    getImageById1,
    createImage,
    updateImage,
    deleteImage,
    
}

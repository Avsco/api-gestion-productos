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

async function getPostulantes() {
    const data= await pool.query(
        `select * from datos_postulante;`
    )   
    Replace(data.rows,data.rowCount)
    response.datos = data.rows

    return response
}

async function getPostulanteById(idpostulante) {
    const data = await pool.query(
        `select * from datos_postulante where idpostulante = $1;`, [idpostulante]
    )
    Replace(data.rows,data.rowCount)

    response.datos = data.rows

    return response
}

async function setNewPostulante(NOMBRESPOSTULANTE,APELLIDOSPOSTULANTE,FECHANACPOSTULANTE,C_I_POSTULANTE,SEXOPOSTULANTE,
    NACIONALIDAD,LUGARNACPOSTULANTE,DIRECCIONPOSTULANTE,TELEFONOPOSTULANTE,CELULARPOSTULANTE,
    EMAILPOSTULANTE,GRADOACADEMICOPOSTULANTE,SITIOWEBPOSTULANTE) {
    const response = await pool.query(
        `insert into datos_postulante(NOMBRESPOSTULANTE,APELLIDOSPOSTULANTE,FECHANACPOSTULANTE,C_I_POSTULANTE,SEXOPOSTULANTE,
            NACIONALIDAD,LUGARNACPOSTULANTE,DIRECCIONPOSTULANTE,TELEFONOPOSTULANTE,CELULARPOSTULANTE,
            EMAILPOSTULANTE,GRADOACADEMICOPOSTULANTE,SITIOWEBPOSTULANTE) 
            values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13);`, 
            [NOMBRESPOSTULANTE,APELLIDOSPOSTULANTE,FECHANACPOSTULANTE,C_I_POSTULANTE,SEXOPOSTULANTE,
            NACIONALIDAD,LUGARNACPOSTULANTE,DIRECCIONPOSTULANTE,TELEFONOPOSTULANTE,CELULARPOSTULANTE,
            EMAILPOSTULANTE,GRADOACADEMICOPOSTULANTE,SITIOWEBPOSTULANTE]
    )
    return response.command
}

async function updatePostulanteById(id, NOMBRESPOSTULANTE,APELLIDOSPOSTULANTE,FECHANACPOSTULANTE,C_I_POSTULANTE,SEXOPOSTULANTE,
    NACIONALIDAD,LUGARNACPOSTULANTE,DIRECCIONPOSTULANTE,TELEFONOPOSTULANTE,CELULARPOSTULANTE,
    EMAILPOSTULANTE,GRADOACADEMICOPOSTULANTE,SITIOWEBPOSTULANTE) {
    const response = await pool.query(
        `UPDATE datos_postulante SET NOMBRESPOSTULANTE=$2,APELLIDOSPOSTULANTE=$3,FECHANACPOSTULANTE=$4,C_I_POSTULANTE=$5,
        SEXOPOSTULANTE=$6,NACIONALIDAD=$7,LUGARNACPOSTULANTE=$8,DIRECCIONPOSTULANTE=$9,TELEFONOPOSTULANTE=$10,CELULARPOSTULANTE=$11,
        EMAILPOSTULANTE=$12,GRADOACADEMICOPOSTULANTE=$13,SITIOWEBPOSTULANTE=$14
        WHERE idpostulante=$1`, 
        [id, NOMBRESPOSTULANTE,APELLIDOSPOSTULANTE,FECHANACPOSTULANTE,C_I_POSTULANTE,SEXOPOSTULANTE,
        NACIONALIDAD,LUGARNACPOSTULANTE,DIRECCIONPOSTULANTE,TELEFONOPOSTULANTE,CELULARPOSTULANTE,
        EMAILPOSTULANTE,GRADOACADEMICOPOSTULANTE,SITIOWEBPOSTULANTE]
    )
    return response.command
}

async function deletePostulanteById(idpostulante) {
    const response = await pool.query('DELETE FROM datos_postulante WHERE idpostulante = $1;', [idpostulante])
    return response.command
}

module.exports = {
    getPostulantes,
    updatePostulanteById,
    getPostulanteById,
    deletePostulanteById,
    setNewPostulante
}

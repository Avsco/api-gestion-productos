const {
    getPostulantes,
    getPostulanteById,
    setNewPostulante,
    updatePostulanteById,
    deletePostulanteById,
    
} = require('./model')

/*http://localhost:4000/products?page=1&limit=20&filter=1 trae todos los productos que pueden tener
    descuentos o ser parte de promociones*/

async function GET(req, res) {
    try {
        let response
        response = await getPostulantes()
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({ errorCode: error.code, msg: error.message })
    }
}

async function SHOW(req, res) {
    try {
        const cod_prod = req.params.id
        const response = await getPostulanteById(cod_prod)

        return res.status(200).json(response)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ errorCode: error.code, msg: error.message })
    }
}

async function POST(req, res) {
    try {
        const {
            NOMBRESPOSTULANTE,APELLIDOSPOSTULANTE,FECHANACPOSTULANTE,C_I_POSTULANTE,SEXOPOSTULANTE,
            NACIONALIDAD,LUGARNACPOSTULANTE,DIRECCIONPOSTULANTE,TELEFONOPOSTULANTE,CELULARPOSTULANTE,
            EMAILPOSTULANTE,GRADOACADEMICOPOSTULANTE,SITIOWEBPOSTULANTE
        } = req.body
        if (!(NOMBRESPOSTULANTE && APELLIDOSPOSTULANTE && FECHANACPOSTULANTE && SEXOPOSTULANTE&& NACIONALIDAD&& LUGARNACPOSTULANTE
            && DIRECCIONPOSTULANTE&& TELEFONOPOSTULANTE&& CELULARPOSTULANTE&& EMAILPOSTULANTE&& GRADOACADEMICOPOSTULANTE&& SITIOWEBPOSTULANTE))
            return res.status(400).json({ msg: 'Complete todos los datos' })
        const response = await setNewPostulante(
            NOMBRESPOSTULANTE,APELLIDOSPOSTULANTE,FECHANACPOSTULANTE,C_I_POSTULANTE,SEXOPOSTULANTE,
            NACIONALIDAD,LUGARNACPOSTULANTE,DIRECCIONPOSTULANTE,TELEFONOPOSTULANTE,CELULARPOSTULANTE,
            EMAILPOSTULANTE,GRADOACADEMICOPOSTULANTE,SITIOWEBPOSTULANTE
        )

        return res.status(200).json('Postulant Added')
    } catch (error) {
        return res.status(500).json({ errorCode: error.code, msg: error.message })
    }
}

async function PUT(req, res) {
    try {
        const id = req.params.id
        const {
            NOMBRESPOSTULANTE,APELLIDOSPOSTULANTE,FECHANACPOSTULANTE,C_I_POSTULANTE,SEXOPOSTULANTE,
            NACIONALIDAD,LUGARNACPOSTULANTE,DIRECCIONPOSTULANTE,TELEFONOPOSTULANTE,CELULARPOSTULANTE,
            EMAILPOSTULANTE,GRADOACADEMICOPOSTULANTE,SITIOWEBPOSTULANTE
        } = req.body
        if (!(NOMBRESPOSTULANTE && APELLIDOSPOSTULANTE && FECHANACPOSTULANTE && SEXOPOSTULANTE&& NACIONALIDAD&& LUGARNACPOSTULANTE
            && DIRECCIONPOSTULANTE&& TELEFONOPOSTULANTE&& CELULARPOSTULANTE&& EMAILPOSTULANTE&& GRADOACADEMICOPOSTULANTE&& SITIOWEBPOSTULANTE))
            return res.status(400).json({ msg: 'Complete todos los datos' })
        const result = await updatePostulanteById(
            id,NOMBRESPOSTULANTE,APELLIDOSPOSTULANTE,FECHANACPOSTULANTE,C_I_POSTULANTE,SEXOPOSTULANTE,
            NACIONALIDAD,LUGARNACPOSTULANTE,DIRECCIONPOSTULANTE,TELEFONOPOSTULANTE,CELULARPOSTULANTE,
            EMAILPOSTULANTE,GRADOACADEMICOPOSTULANTE,SITIOWEBPOSTULANTE)
        return res.status(200).json('Postulant updated')
    } catch (error) {
        return res.status(500).json({ errorCode: error.code, msg: error.message })
    }
}

async function DELETE(req, res) {
    try {
        const id = req.params.id

        await deletePostulanteById(id)

        return res.status(200).json('Postulant deleted')
    } catch (error) {
        return res.status(500).json({ errorCode: error.code, msg: error.message })
    }
}



module.exports = {
    GET,
    SHOW,
    POST,
    PUT,
    DELETE,

}

const {
    getProduction,
    getProductionById,
    postProduction,
    updateProduction,
    deleteProduction,
    
} = require('./model')


async function GET(req, res) {
    try {
        let response
        response = await getProduction()
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({ errorCode: error.code, msg: error.message })
    }
}

async function SHOW(req, res) {
    try {
        const cod_produccion = req.params.id
        const response = await getProductionById(cod_produccion)

        return res.status(200).json(response)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ errorCode: error.code, msg: error.message })
    }
}

async function POST(req, res) {
    try {
        const cod_postulante = req.params.id
        let {
            tituloProduccion,anoProduccion,idiomaProduccion,urlProduccion,paisProduccion
        } = req.body
        if (!(tituloProduccion && anoProduccion))
            return res.status(400).json({ msg: 'Complete todos los datos' })
        if((!idiomaProduccion)||(idiomaProduccion==null))
            idiomaProduccion='-'
        if((!urlProduccion)||(urlProduccion==null))
            urlProduccion='-'
        if((!paisProduccion)||(paisProduccion==null))
            paisProduccion='-'
        const response = await postProduction(
            cod_postulante,tituloProduccion,anoProduccion,idiomaProduccion,urlProduccion,paisProduccion
        )

        return res.status(200).json('Production Added')
    } catch (error) {
        return res.status(500).json({ errorCode: error.code, msg: error.message })
    }
}

async function PUT(req, res) {
    try {
        const cod_produccion = req.params.id
        const {
            tituloProduccion,anoProduccion,idiomaProduccion,urlProduccion,paisProduccion
        } = req.body
        if (!(tituloProduccion && anoProduccion))
            return res.status(400).json({ msg: 'Complete todos los datos' })
        if(idiomaProduccion==null)
            idiomaProduccion=='-'
        if(urlProduccion==null)
            urlProduccion=='-'
        if(idiomaProduccion==null)
            paisProduccion=='-'
        const result = await updateProduction(
            cod_produccion,tituloProduccion,anoProduccion,
            idiomaProduccion,urlProduccion,paisProduccion
        )
        return res.status(200).json('Production updated')
    } catch (error) {
        return res.status(500).json({ errorCode: error.code, msg: error.message })
    }
}

async function DELETE(req, res) {
    try {
        const cod_produccion = req.params.id
        await deleteProduction(cod_produccion)
        return res.status(200).json('Production deleted')
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

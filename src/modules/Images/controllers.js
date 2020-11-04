const {
    getImage,
    getImageById,
    createImage,
    updateProduct,
    deleteProduct,
} = require('./model')

async function GET(req, res) {
    try {

        const criterio = req.query.criterio
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)

        const response = await getImage(criterio,page,limit)

        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({ errorCode: error.code, msg: error.message })
    }
}

async function SHOW (req, res) {
    try {
        console.log("Hola")
        const cod_prod = req.params.id
        const cantidad = req.query.cantidad
        console.log("la cantidad es "+ cantidad)
        const response = await getImageById(cod_prod)

        return res.status(200).json(response)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ errorCode: error.code, msg: error.message })
    }
}

async function POST (req, res) {
    try {
        const {cod_prod, imagen } = req.body
        if(!(cod_prod && imagen)) return res.status(400).json({ msg: 'Complete todos los datos' })
        await createImage(cod_prod, imagen)

        return res.status(200).json('Created product')
    } catch (error) {
        return res.status(500).json({ errorCode: error.code, msg: error.message })
    }
}

async function PUT (req, res) {
    try {
        const id = req.params.id
        const { nombre_prod, descripcion, precio_unid, peso, unidad_med, fecha_venc, cantidad } = req.body
        await updateProduct(id, nombre_prod, descripcion, precio_unid, peso, unidad_med, fecha_venc, cantidad)

        return res.status(200).json('Updated product')
    } catch (error) {
        return res.status(500).json({ errorCode: error.code, msg: error.message })
    }
}

async function DELETE (req, res) {
    try {
        const id = req.params.id
        await deleteProduct(id)

        return res.status(200).json('Deleted product')
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
const {
    getDiscount,
    getDiscountById,
    createDiscount,
    updateDiscount,
    deleteDiscount,
    } = require('./model')

async function GET(req, res) {
    try {
        const criterio = req.query.criterio
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)

        const response = await getDiscount(criterio,page,limit)

        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({ errorCode: error.code, msg: error.message })
    }
}

async function SHOW (req, res) {
    try {
        const cod_prod = req.params.id
        const cantidad = req.params.cantidad
        const response = await getDiscountById(cod_prod)

        return res.status(200).json(response)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ errorCode: error.code, msg: error.message })
    }
}

async function POST (req, res) {
    try {
        const { nombre_prod, descripcion, categoria, precio_unid, unidad, cantidad, peso, unidad_med, fecha_venc } = req.body
        if(!(nombre_prod && descripcion && precio_unid && categoria)) return res.status(400).json({ msg: 'Complete todos los datos' })
        const response = await createDiscount(nombre_prod, descripcion, categoria, precio_unid, cantidad, peso, unidad_med, fecha_venc)

        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({ errorCode: error.code, msg: error.message })
    }
}

async function PUT (req, res) {
    try {
        const id = req.params.id
        const { nombre_prod, descripcion, precio_unid, peso, unidad_med, fecha_venc, cantidad } = req.body
        await updateDiscount(id, nombre_prod, descripcion, precio_unid, peso, unidad_med, fecha_venc, cantidad)

        return res.status(200).json('Product updated')
    } catch (error) {
        return res.status(500).json({ errorCode: error.code, msg: error.message })
    }
}

async function DELETE (req, res) {
    try {
        const id = req.params.id
        await deleteDiscount(id)

        return res.status(200).json('Product deleted')
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
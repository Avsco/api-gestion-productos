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
        var comp = "\""+"\""
        var categoria = req.query.categoria
 
        if ((categoria==comp)||(categoria==undefined) ){categoria=''}
        const response = await getDiscount(criterio,categoria,page,limit)

        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({ errorCode: error.code, msg: error.message })
    }
}

async function SHOW (req, res) {
    try {
        const cod_prod = req.params.id
        const response = await getDiscountById(cod_prod)

        return res.status(200).json(response)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ errorCode: error.code, msg: error.message })
    }
}

async function POST (req, res) {
    try {
        const { cod_prod, porcentaje, cantidad_req } = req.body
        if(!(cod_prod && porcentaje && cantidad_req)) return res.status(400).json({ msg: 'Complete todos los datos' })
        const response = await createDiscount(cod_prod, porcentaje, cantidad_req)

        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({ errorCode: error.code, msg: error.message })
    }
}

async function PUT (req, res) {
    try {
        const id = req.params.id
        const { porcentaje, cantidad_req } = req.body
        if(!( porcentaje && cantidad_req)) return res.status(400).json({ msg: 'Complete todos los datos' })

        await updateDiscount(id, porcentaje, cantidad_req)

        return res.status(200).json('Discount updated')
    } catch (error) {
        return res.status(500).json({ errorCode: error.code, msg: error.message })
    }
}

async function DELETE (req, res) {
    try {
        const id = req.params.id
        await deleteDiscount(id)

        return res.status(200).json('Discount deleted')
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

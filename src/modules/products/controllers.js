const {
    getProduct,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} = require('./model')

async function GET(req, res) {
    try {
        const response = await getProduct()

        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({ errorCode: error.code, msg: error.message })
    }
}

async function SHOW (req, res) {
    try {
        const id = req.params.id
        const response = await getProductById(id)

        return res.status(200).json(response)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ errorCode: error.code, msg: error.message })
    }
}

async function POST (req, res) {
    try {
        const { name, price, description } = req.body
        if(!(name && price && description)) return res.status(400).json({ msg: 'Complete todos los datos' })
        await createProduct(name, price, description)

        return res.status(201).json('Created product')
    } catch (error) {
        return res.status(500).json({ errorCode: error.code, msg: error.message })
    }
}

async function PUT (req, res) {
    try {
        const id = req.params.id
        const { name, price, description } = req.body
        await updateProduct(id, name, price, description)

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
    DELETE
}

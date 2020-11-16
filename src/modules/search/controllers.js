const { search } = require('./model')

async function GET(req, res) {
    try {
        const criterio = req.query.criterio
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)
        const expresion = req.query.expresion

        const response = await getProduct(expresion, criterio, page, limit)

        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({ errorCode: error.code, msg: error.message })
    }
}

module.exports = { GET }

const {
    getPromotionById,
    getPromotions,
    getPromotionImage,
    getProductsForPromotion
    } = require('./model')

async function GET (req, res){
    try {
        const response=await getPromotions()
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({ errorCode: error.code, msg: error.message })
    }
}

async function SHOW (req, res){
    try {
        const cod_prom=req.params.id
        const response=await getPromotionById(cod_prom)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({ errorCode: error.code, msg: error.message })        
    }
}

async function IMAGE (req, res){
    try {
        const cod_prom=req.params.id
        const response=await getPromotionImage(cod_prom)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({ errorCode: error.code, msg: error.message })
    }
}

async function PRODS (req, res){
    try {
        const id=req.params.id
        const resp=await getProductsForPromotion(id)
        return res.status(200).json(resp)
    } catch (error) {
        return res.status(500).json({ errorCode: error.code, msg: error.message })
    }
}

module.exports = {
    GET,
    SHOW,
    IMAGE,
    PRODS
}
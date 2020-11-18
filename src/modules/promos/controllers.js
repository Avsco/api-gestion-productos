const {
    getPromotionById,
    getPromotions,
    getPromotionImage,
    getProductsForPromotion,
    createPromotion,
    addProductsToProm
    } = require('./model')

async function GET (req, res){
    try {
        const criterio = req.query.criterio
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)

        const response=await getPromotions(criterio, page, limit)
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

async function POST(req,res){
    try{
        const{nombr_prom,descrip_prom,cantidad_prom,precio_prom,fecha_ini,fecha_fin,imagen_prom, products}=req.body
        if(!(nombr_prom && descrip_prom && cantidad_prom && precio_prom && fecha_ini && fecha_fin )) return res.status(400).json({ msg: 'Complete todos los datos' })
        if(imagen_prom.substr(11,4) == 'jpeg'){
            var imagen2 = imagen_prom.replace('data:image/jpeg;base64,', '');
        }
        else if(imagen_prom.substr(11,3) == 'jpg'){
            var imagen2 = imagen_prom.replace('data:image/jpg;base64,', '');
        }else{
            var imagen2 = imagen_prom.replace('data:image/png;base64,', '');
        }
        const idProm = await createPromotion(nombr_prom,descrip_prom,cantidad_prom,precio_prom,fecha_ini,fecha_fin,imagen2)
        const response = await addProductsToProm(idProm,products) 
        return res.status(200).json("Hola")

    }catch(error){
        return res.status(500).json({ errorCode: error.code, msg: error.message })
    }
}

module.exports = {
    GET,
    SHOW,
    IMAGE,
    PRODS,
    POST
}
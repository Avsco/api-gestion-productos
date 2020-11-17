const {
    getProduct,
    getProductClient,
    getProductById,
    categoryManage,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductsWithDiscount,
    getPromotionsForProduct
    } = require('./model')


    /*http://localhost:4000/products?page=1&limit=20&filter=1 trae todos los productos que pueden tener
    descuentos o ser parte de promociones*/

async function GET(req, res) {
    try {
        console.log(req.query)
        var response
        var comp = "\""+"\""
        const filter = req.query.filter
        const criterio = req.query.criterio
        var categoria = req.query.categoria
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)
        if ((categoria==comp)||(categoria==undefined) ){categoria=''}

        if(req.query.usr=='1234'){
            console.log("aquiCliente")
            console.log("criterio "+criterio)
            console.log("categoria "+categoria)
            response = await getProductClient(criterio,categoria,page,limit)
        }else{
            console.log("aquiAdmin")
            console.log(filter)
            response = await getProduct(criterio,categoria,page,limit,filter)
        }
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({ errorCode: error.code, msg: error.message })
    }
}

async function SHOW (req, res) {
    try {
        const cod_prod = req.params.id
        const cantidad = req.params.cantidad
        const response = await getProductById(cod_prod)

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
        const creaCat = await categoryManage(categoria)
        const response = await createProduct(nombre_prod, descripcion, categoria, precio_unid, cantidad, peso, unidad_med, fecha_venc)

        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({ errorCode: error.code, msg: error.message })
    }
}

async function PUT (req, res) {
    try {
        const id = req.params.id
        const { nombre_prod, descripcion, precio_unid, peso, unidad_med, fecha_venc, cantidad } = req.body
        await updateProduct(id, nombre_prod, descripcion, precio_unid, peso, unidad_med, fecha_venc, cantidad)

        return res.status(200).json('Product updated')
    } catch (error) {
        return res.status(500).json({ errorCode: error.code, msg: error.message })
    }
}

async function DELETE (req, res) {
    try {
        const id = req.params.id
        await deleteProduct(id)

        return res.status(200).json('Product deleted')
    } catch (error) {
        return res.status(500).json({ errorCode: error.code, msg: error.message })
    }
}

async function DISCOUNT (req, res){
    try {
        const resp= await getProductsWithDiscount();
        return res.status(200).json(resp)
    } catch (error) {
        return res.status(500).json({ errorCode: error.code, msg: error.message })
    }
}


async function PROMOS (req, res){
    try {
        const id=req.params.id
        const resp=await getPromotionsForProduct(id)
        return res.status(200).json(resp)
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
    DISCOUNT,
    PROMOS
}

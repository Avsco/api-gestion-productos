const {
    getImageById1,
    getImageByIdAll,
    createImage,
    updateImage,
    deleteImage,
} = require('./model')

/*async function GET(req, res) {
    try {

        const criterio = req.query.criterio
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)

        const response = await getImage(criterio,page,limit)

        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({ errorCode: error.code, msg: error.message })
    }
}*/
/*El metodo show nos da 2 opciones para traer imagenes, la primera nos trae todas las imagenes de un producto segun su id
Su sintaxis es: http://localhost:4000/images/6?cantidad=1 donde el valor de "1" es irrelevante, ya que trae todas las imagenes
sin importar el valor que se coloque, ya que solo verifica que el campo cantidad tenga un valor en la query URL.
Caso contrario, si no se coloca el campo cantidad en la query URL, como se muestra a continuacion: http://localhost:4000/images/6
solamente si traera la primera imagen correspondiente al id del producto seleccionado */ 
async function SHOW (req, res) {
    try {
        const cod_prod = req.params.id
        if(req.query.cantidad){
            const cantidad = req.query.cantidad
            var response = await getImageByIdAll(cod_prod,cantidad)
        }else{
            var response = await getImageById1(cod_prod)
        }
        return res.status(200).json(response)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ errorCode: error.code, msg: error.message })
    }
}

async function POST (req, res) {
    try {
        const {cod_prod, imagen } = req.body
        if(imagen.substr(11,4) == 'jpeg'){
            var imagen2 = imagen.replace('data:image/jpeg;base64,', '');
        }
        else if(imagen.substr(11,3) == 'jpg'){
            var imagen2 = imagen.replace('data:image/jpg;base64,', '');
        }else{
            var imagen2 = imagen.replace('data:image/png;base64,', '');
        }
        if(!(cod_prod && imagen)) return res.status(400).json({ msg: 'Complete todos los datos' })
        await createImage(cod_prod, imagen2)

        return res.status(200).json('Image created')
    } catch (error) {
        return res.status(500).json({ errorCode: error.code, msg: error.message })
    }
}

async function PUT (req, res) {
    try {
        const id = req.params.id
        const {num_pic,imagen} = req.body
        if(!(num_pic,imagen)) return res.status(400).json({ msg: 'Complete todos los datos' })
        await updateImage(id, num_pic, imagen)

        return res.status(200).json('Image updated')
    } catch (error) {
        return res.status(500).json({ errorCode: error.code, msg: error.message })
    }
}

async function DELETE (req, res) {
    try {
        const id = req.params.id
        const {num_pic}=req.body
        if(!(num_pic)) return res.status(400).json({ msg: 'Complete todos los datos' })
        await deleteImage(id,num_pic)

        return res.status(200).json('Image deleted')
    } catch (error) {
        return res.status(500).json({ errorCode: error.code, msg: error.message })
    }
}

module.exports = {
    //GET,
    SHOW,
    POST,
    PUT,
    DELETE,
    getImageById1,
    getImageByIdAll
}
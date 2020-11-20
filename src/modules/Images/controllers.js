const {
    getImageById1,
    getImageByIdAll,
    createImage,
    updateImage,
    deleteImage,
} = require('./model')


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

    SHOW,
    POST,
    PUT,
    DELETE,
    getImageById1,
    getImageByIdAll
}
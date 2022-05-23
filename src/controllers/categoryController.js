const Category = require('../models/Category')
const { errorHandler } = require('../helpers/dberrorHandler')

// exports.test = (req, res) => {
//     res.send('Mensaje desde controller')
// }


// crear nuevas categorias
exports.create = (req,res) =>{
    const category = new Category(req.body) //body se obtendra de postman o React 
    category.save((err, data) =>{
        if(err){ //si ocurre un error se devuelve una respuesta
            return res.status(400).json()
            error: errorHandler(err)
        }
        res.json({data})//si no ocuure, que regrese la data 
    })
}


//listar las categorias 
exports.list = (req, res) => {
    Category.find().exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: err.errorHandler(err)
            })
        }
        res.json({data})
    })
}

// quitar categorias 
exports.remove = (req, res) => {
    let category = req.category
    category.remove((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json({
            message: 'Category successfully deleted'
        })
    })
}

exports.categoryById = (req,res,next,id) => {
    Category.findById(id).exec((err,category)=>{
        if (err || !category){
            return res.status(400).json({
                error: 'Category was nos found or does not exist'
            })
        }
        req.category = category
        next()
    })
}


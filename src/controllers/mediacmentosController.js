//librerias para facilitar el almacenamiento de los medicamentos
const formidable = require('formidable')
const _ = require('lodash')
const fs = require('fs') //Escoger imagenes desde el sistea operativo

//importacion del modelo y el archivo de errores 
const { errorHandler } = require('../helpers/dberrorHandler')
const Medicamentos = require('../models/Medicamentos')

//Crear nuevos medicamentos
exports.create = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, files) => {
      if (err) {
        return res.status(400).json({
          error: "Image could not be uploaded"
        })
      }
  
      const { name, description, price, category, quantity } = fields
      let medicamentos = new Medicamentos(fields);

      if (files.photo) {
        if (files.photo.size > 1000000) {
          return res.status(400).json({
            error: "Image should be lass than 1MB in size"
          })
        }
        medicamentos.photo.data = fs.readFileSync(files.photo.filepath)
        medicamentos.photo.contentType = files.photo.mimetype
      }
  
      medicamentos.save((err, result) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(error)
          })
        }
        res.json(result);
      })
  
    })
  }

  //Listar los medicamentos
exports.list = (req, res) => {
    let order = req.query.order ? req.query.order : 'asc' //Ordenar de manera ascendente
    let sortBy = req.query.sortBy ? req.query.sortBy : 'name' //Ordenar los medicamentos por nombre

    Medicamentos.find() 
        .select('-photo') //No Cargar la foto para no realentar la carga de la pagina web
        .populate('category')
        .sort([[sortBy, order]])
        .exec((err, medicamentos)=>{
            if(err){
                return res.status(400).json({
                    error: 'Medicamentos not found'
                })
            }
            res.json(medicamentos)
        })
}


exports.read = (req, res) =>{
    req.medicamentos.photo = undefined
    return res.json(req.medicamentos)
}

//Quitar los medicamentos
exports.remove = (req, res) =>{
  let medicamentos = req.medicamentos
  medicamentos.remove((err, deletedMedicamentos) =>{
    if (err) {
      return res.status(400).json({ 
        error: errorHandler(err)
      })
    }
    res.json({
      message: 'Medicamento borrado correctamente'
    })
  })
}

exports.medicamentosId = (req, res, next, id) =>{
  //buscar el id que tenga la categoria especificada
  Medicamentos.findById(id)
    .populate('category')
    .exec((err, medicamentos) =>{
      if (err || !medicamentos) {
        return res.status(400).json({
          error: 'error en busqueda del medicamento no funciona o no existe'
        })
      }
      req.medicamentos = medicamentos
      next() //que continue con los procesos que lleva
    })

}

exports.photo = (req, res, next ) => {
    if (req.medicamentos.photo.data) {
      res.set('Content-Type', req.medicamentos.photo.contentType)
      return res.send(req.medicamentos.photo.data)
    }
    next()
  }


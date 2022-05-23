const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema //propiedad que apunta a Id de la categoria

const medicamentoSchema = new mongoose.Schema(
    {
        name: {
          type: String,
          trim: true, 
          requrie: true,
          maxlength: 32,
        },
        description: {
          type: String,
          trim: true,
          require: true,
          maxlength: 20000
        },
        price: {
          type: Number,
          trim: true,
          require: true,
          maxlength: 32,
        },
        category: {
          type: ObjectId,
          ref: 'Category',
          require: true
        },
        quantity: {
          type: Number,
        },
        photo: {
          data: Buffer,
          contentType: String
        }
      },
      {timestamps: true}
)

module.exports = mongoose.model('Medicamento', medicamentoSchema)
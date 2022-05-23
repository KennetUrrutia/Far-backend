const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
            maxlength: 32,
            unique: true
        }
    }
)

module.exports = mongoose.model('Category', categorySchema)

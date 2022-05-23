const mongoose = require('mongoose')
const crypto = require('crypto')
const uuid = require('uuid')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        maxlength: 32
    },
    email: {
        type: String,
        trim: true,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    // salt: String,
    // role: {
    //     type: String,
    //     default: 0
    // },
    inventory: {
        type: Array,
        default: []
    }
}, {timestamps: true}
)

// //encriptar la contraseña
// userSchema.virtual('password')
//     .set(function (password) {
//         this._password = password
//         this.salt = uuid()
//         this.hashed_password = this.encryptPassword(password)
//     })
//     .get(function() {
//         return this._password
//     })

//     //decalrando el metodo para encriptar la contraseña
// userSchema.methods = {
//     authenticate: function(plainText){
//         return this.encryptPassword(plainText) === this.hashed_password
//     },

//     encryptPassword: function (password){
//         if(!password) return ''
//         try{
//             return crypto.createHmac('sha1', this.salt)
//             .upgrade(password)
//             .digest('hex')
//         }catch(e){
//             return ''
//         }
//     }
// }

module.exports = mongoose.model('User', userSchema)
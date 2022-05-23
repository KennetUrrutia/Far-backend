//import libreries 
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser') //reccibe la informacion de postman
const cors = require('cors') //
const e = require('cors')


//use methods libs
const app = express()
require('dotenv').config()

//middelwares
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cors())


//database setup
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const connection = mongoose.connection
connection.once('open', () =>{
    console.log('Conectado a DB')
})

//routes retup
//------ route name ---- dir ubication ---
app.use('/api/category', require('./routes/category'))
app.use('/api/medicamentos', require('./routes/medicamentos'))
app.use('/api/auth', require('./routes/auth'))

// app.get('/', (req, res) => {
//     res.send('Hola desde servidor Mern')
// })


//Listen port
const port = process.env.PORT

app.listen(port, () => {
    console.log(`Servidor en el puerto ${port}`)
})
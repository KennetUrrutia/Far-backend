const express = require('express')
const router = express.Router()
const { userById } = require('../controllers/authController')

const { list, read, create, remove, medicamentosId, photo } = require('../controllers/mediacmentosController')

router.get('/listMedicamentos', list)
router.get('/photo/:medicamentosId', photo)
router.get('/:medicamentosId', read)
router.post('/create', create)
router.delete('/:medicamentosId', remove)

router.param('medicamentosId', medicamentosId)
router.param('userId', userById)
module.exports = router 

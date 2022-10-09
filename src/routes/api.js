const express = require('express')
const router = express.Router()
const MediaController = require('../controllers/MediaControllers')
const fileUpload = require('../utils/fileUploads')

router.post('/media', fileUpload("./public/images"), MediaController.createMedia)
router.get('/media/:id', MediaController.findById)
router.delete('/media/:id', MediaController.deleteMedia)
module.exports = router
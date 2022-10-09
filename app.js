const express = require('express')
const router = require('./src/routes/api')
const app = new express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const multer = require('multer')

app.use(bodyParser.json())

const URI = "mongodb://localhost:27017/media"
mongoose.connect(URI,
    err=>{
        if(err) throw err;
        console.log('connected to MongoDB')
    })

app.use('/media', express.static('storage/images'))

app.use('/api/v1', router)

app.use((err, req, res, next) => {
    if(err instanceof multer.MulterError){
        return res.status(418).json({
            err_code:err.code,
            err_message:err.message
        })
    } else {
        return res.status(500).json({
            err_code:409,
            err_message: "Something went wrong!"
        })
    }
})


module.exports = app
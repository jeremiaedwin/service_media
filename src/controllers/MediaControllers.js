const Media = require ('../models/Media')
const mongoose = require('mongoose')
const fs = require('fs')
const DIR = './'

module.exports = class MediaController {
    static createMedia = async (req, res) => {
        let payload = req.body

        var imgUrl = ""
        if(req.file) var imgUrl = `public/images/${req.file.filename}`
        payload.url = imgUrl

        try {
            const mediaCreate = await new Media(payload).save()
            return res.status(200).json({
                code: 200,
                message: "Media Create Successfully",
                data: mediaCreate
            })
        } catch (error){
            res.status(501).json({
                code: 501,
                message: error.message,
                error:true
            })
        }
    }

    static findById = async(req, res) => {
        const id = req.params.id;

        try{
            const singleImage = await Media.findById(id)
            const {name, url} = singleImage
            var getImageName = url.match(/\/([^\/?#]+)[^\/]*$/)

            const singleImageData = {
                name,
                url,
                imageUrl: `http://localhost:5000/media/${getImageName[1]}`
            }

            return res.status(200).json({
                code: 200,
                message: "Media Info",
                data: singleImageData
            })
        }
        catch (error){
            res.status(501).json({
                code: 501,
                message: error.message,
                error:true
            })
        }
    }

    static deleteMedia = async(req, res) => {
        const id = req.params.id;

        try {
            const mediaInfo = await Media.findById(id);
            const mediaPhotoInfo = mediaInfo.url
            if(mediaPhotoInfo){
                fs.unlinkSync(DIR+mediaPhotoInfo)
            }

            const mediaDelete = await Media.deleteOne({_id:id})
            return res.status(200).json({
                code:200,
                message: "Media deleted"
            })
        } catch (error) {
            res.status(501).json({
                code:501,
                message:error.message,
                error:true
            })
        }
    }
}
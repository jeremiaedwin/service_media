const mongoose = require('mongoose')

const DataSchema = new mongoose.Schema({
    name: { 
        type:String,
        required: [true, 'Please enter name'],
        trim: true,
        maxlength: [100]
    },
    url:{
        type:String,
        required: false
    }
},{timestamps:true, versionKey:false})

const Media = mongoose.model('Media', DataSchema, 'medias')
module.exports = Media
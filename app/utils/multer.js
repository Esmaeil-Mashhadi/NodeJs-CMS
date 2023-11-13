const multer = require("multer");
const path = require('path')

const fs = require('fs');
const createHttpError = require("http-errors");

function routeCreation(req){
   
    const date = new Date()
    const year =date.getFullYear().toString()
    const month = date.getMonth().toString()
    const day = date.getDay().toString()
    const directory =  path.join(__dirname, '..', '..', 'public' ,'uploads', 'blogs', year , month , day )
    req.body.fileUploadPath = path.join('uploads','blogs' , year , month , day)
    fs.mkdirSync(directory , {recursive:true})
    return directory

}
const storage = multer.diskStorage({
    
    destination:(req , file , cb)=>{
        if(file?.originalname){
            const filePath = routeCreation(req)
            cb(null , filePath)
        }
        
    }, 

    filename : (req , file , cb)=>{
        if(file?.originalname){
            const ext = path.extname(file.originalname)
            const filename = new Date().getTime() + ext
            req.body.filename = filename
            cb(null , filename)
        }
       
    }
})

function fileFilter(req , file , cb){
    const ext = path.extname(file.originalname)
    const allowedTypes = ['.jpg', '.jpeg' , '.png' , '.webp']
    if(allowedTypes.includes(ext)){
        return cb(null , true)
    }
    cb(createHttpError.BadRequest("format is not supported"))
}
function videoFilter(req , file , cb){
    const ext = path.extname(file.originalname)
    const allowedTypes = ['.mp4', '.mpeg' , '.mkv' , '.avi']
    if(allowedTypes.includes(ext)){
        return cb(null , true)
    }
    cb(createHttpError.BadRequest("video format is not supported"))
}



const maxImageSize = 2*1000*1000
const maxVideSize = 50*1000*1000
const multerImageUpload = multer({storage ,fileFilter , limits:{fileSize : maxImageSize}})
const multerVideoUpload = multer({storage ,videoFilter , limits:{fileSize : maxVideSize}})


module.exports = {
    multerImageUpload ,
    multerVideoUpload
}
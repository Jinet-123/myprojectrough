
const multer = require("multer")

const storage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,"./Imguploads")
    },
    filename : (req,file,cb) =>{
        cb(null,`Image - ${Date.now()}-${file.originalname}`)
    }
})

const filefilter = (req,file,cb) =>{
    if(file.mimetype ==`image/jpg` || file.mimetype ==`image/jpeg` || file.mimetype ==`image/png`){
        cb(null,true)
    }else{
        cb(null,false)
        return cb(new Error ("accept only jpg,png,jpeg files"))
    }
}

const multerconfig = multer({
    storage,
    filefilter
})

module.exports = multerconfig
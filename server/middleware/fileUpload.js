import multer from "multer";
import fs from "fs";
import { fileURLToPath } from "url"
import { dirname, join } from "path"

const __filename = fileURLToPath(import.meta.url); // get current file
const __dirname = dirname(__filename); // get current path via using current 

const uploads_dir = join(__dirname,"../public/uploads"); // set uploads directory 

// check a file directory at the specified path exists
if(!fs.existsSync(uploads_dir)){ 
    fs.mkdirSync(uploads_dir,{recursive:true})
}

// multer disk storage configuration
const storage = multer.diskStorage({
    // function to determine where files will be saved 
    destination:(req, file, cb)=>{
        //cb(error, destination_path)
        cb(null, uploads_dir);
    },

    // function to determin the unique filename
    filename:(req,file,cb)=>{
        const extension = file.originalname.split('.').pop();
        const uniquename = `${file.fieldname}-${Date.now()}-${Math.round(Math.random() * 1E9)}.${extension}`
        // cb(error, filename)
        cb(null, uniquename)
    }
})

// Create multer instence
const upload = multer({
    storage:storage,
    limits:{ fileSize: 5 * 1024 * 1024 }, //Optional: 5mb limit 
    // Optional fle filter to allow only certain mime types(eg: images)
    fileFilter:(req,file,cb)=>{
        if(file.mimetype.startsWith('image/')){
            cb(null,true); //accept file
        }
        else{
            cb(new Error('Only image files only allowed!'), false)
        }
    } 
})

// export the middleware function
export const uploadSingleFile = (fieldName) => {
    return upload.single(fieldName) 
}
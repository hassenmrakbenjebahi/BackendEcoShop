import multer, { diskStorage } from "multer";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

// Les extensions à accepter
const MIME_TYPES = {
    "image/jpg": "jpg",
    "image/jpeg": "jpeg",
    "image/png": "png",
  };


// to Add image of product
export const singleImage = multer({
    storage: diskStorage({
      destination: (req, file, callback) => {
        const __dirname = dirname(fileURLToPath(import.meta.url));
        callback(null, join(__dirname, '../public/images'));
      },
      filename: (req, file, callback) => {
        callback(null, file.originalname);
      },
    }),
  
    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(png|jpg|jpeg|JPG|PNG|JPEG)$/)) {
        return cb(new Error("Please upload a Image"));
      }
      cb(undefined, true);
    },
  }).single("image"); 
   
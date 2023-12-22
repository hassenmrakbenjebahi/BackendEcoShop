import multer, { diskStorage } from 'multer';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// Define the allowed file extensions
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
};

export default multer({
  storage: diskStorage({
    destination: (req, file, callback) => {
      const __dirname = dirname(fileURLToPath(import.meta.url));
      callback(null, join(__dirname, '../public/images')); // Update the storage location
    },
    filename: (req, file, callback) => {
      const name = file.originalname.split(' ').join('_');
      const extension = MIME_TYPES[file.mimetype];
      callback(null, name + Date.now() + '.' + extension);
    },
  }),
  limits: { fileSize: 10 * 1024 * 1024 }, // Update the file size limit to 10MB
}).single('image'); // Update the file field name to match the "image" property in your "product" model

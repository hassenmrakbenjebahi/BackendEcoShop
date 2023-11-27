import multer, { diskStorage } from "multer"; // Importer multer
import { join, dirname } from "path";
import { fileURLToPath } from "url";

// Les extensions à accepter
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
  "image/png": "png",
};

export default multer({
  // Configuration de stockage
  storage: diskStorage({
     destination: (req, file, callback) => {
      const __dirname = dirname(fileURLToPath(import.meta.url)); // Récupérer le chemain du dossier courant
      callback(null, join(__dirname, '../public/images')); // Indiquer l'emplacement de stockage
    },
     filename: (req, file, callback) => {
       const name = file.originalname.split(" ").join("_");
       const extension = MIME_TYPES[file.mimetype];
       callback(null, name + Date.now() + "." + extension);
    },
  }),
   limits: 10 * 1024 * 1024,
}).single("Image"); 
 
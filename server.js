import express from 'express';
import mongoose from 'mongoose';
import productRoutes from './routes/product.js';

const app = express();
const port = process.env.PORT || 9090;
const databaseName = 'ecoshopdb';
const db_url = process.env.DB_URL || 'mongodb://127.0.0.1:27017';

mongoose.set('debug', true);
mongoose.Promise = global.Promise;

mongoose
  .connect(`${db_url}/${databaseName}`)
  .then(() => {
    console.log(`Connected to ${databaseName}`);
  })
  .catch(err => {
    console.log(err);
  });

  app.use(express.urlencoded({ extended: true })); // Pour analyser application/x-www-form-urlencoded
  app.use('/image', express.static('public/images')); // Servir les fichiers sous le dossier public/images  
  app.use(express.json());
  app.use("/product",productRoutes)

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });
  
import express from 'express';
import mongoose from 'mongoose';
import posteRoutes from './routes/post.js';
import commentRoutes from './routes/comment.js';
const app = express();
const port = process.env.PORT || 9090;
const databaseName = 'ecoshopdb';
const db_url = process.env.DB_URL || `mongodb://localhost:27017`;

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
  app.use('/media', express.static('public/images')); // Servir les fichiers sous le dossier public/images  
  app.use(express.json());
  app.use('/posts',posteRoutes);
  app.use('/comments',commentRoutes);


  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });
  
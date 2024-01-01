// import "express" module
import express from 'express';
// import "body-parser" module
import bodyParser from 'body-parser';
// import "mongoose" module
import mongoose from 'mongoose';
import cors from 'cors';
// import "routes"
import historiqueRouter from './routes/historique.js';
import impactRouter from './routes/impact.js';
import userRouter from './routes/user.js'
import routeproduct from './routes/product.js'
// creates express application (app)
const app = express();
// app configuration
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});
// Port
const port = 3000;
// DataBase
const databaseName = 'ecoshopdb';
const db_url =`mongodb://127.0.0.1:27017`;
mongoose
  .connect(`${db_url}/${databaseName}`)
  .then(() => {
    console.log(`Connected to ${databaseName}`);
  })
  .catch(err => {
    console.log(err);
  });

  // path
  app.use('/historique', historiqueRouter );
  app.use('/user', userRouter );
  app.use('/product',routeproduct);

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });
// import "express" module
import express from 'express';
// import "body-parser" module
import bodyParser from 'body-parser';
// import "mongoose" module
import mongoose from 'mongoose';
// import "routes"
import historiqueRouter from './routes/historique.js';
import impactRouter from './routes/impact.js';
// creates express application (app)
const app = express();
// app configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const port = process.env.PORT || 9090;
// DataBase
const databaseName = 'ecoshopdb';
const db_url = process.env.DB_URL || `mongodb://127.0.0.1:27017`;
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
  app.use('/impact', impactRouter );

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });
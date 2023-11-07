import express from 'express';
import mongoose from 'mongoose';
const app = express();
const port = process.env.PORT || 9090;
const databaseName = 'ecoshopdb';
const db_url = process.env.DB_URL || `mongodb://localhost:27017`;

mongoose
  .connect(`${db_url}/${databaseName}`)
  .then(() => {
    console.log(`Connected to ${databaseName}`);
  })
  .catch(err => {
    console.log(err);
  });

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });
  
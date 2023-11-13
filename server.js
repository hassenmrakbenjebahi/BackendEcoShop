import express from 'express';

import { notFoundError } from './middlewares/error.js';
import mongoose from 'mongoose';

import morgan from 'morgan';

import authRouter from './router/authRoute.js'

const app = express()
const hostanme = "127.0.0.1"
const port = 3000

// app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.use(express.urlencoded({ extended: true }))
//DB
mongoose.set('debug', true)
mongoose.Promise = global.Promise;
mongoose
    .connect('mongodb://127.0.0.1:27017/User')
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => {
        console.log(err);
    })

app.use('/user',authRouter)
app.use(express.urlencoded({ extended: true }));
app.use(notFoundError)



app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});


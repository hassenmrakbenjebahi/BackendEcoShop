import express from 'express';

import { notFoundError } from './middlewares/error.js';
import posteRoutes from './routes/post.js';
import commentRoutes from './routes/comment.js';
import usersRoutes from './routes/user.js'
import mongoose from 'mongoose';

import morgan from 'morgan';

import authRouter from './router/authRoute.js'
import routeproduct from './routes/product.js'
import historiqueRouter from './routes/historique.js'

import path from 'path';
import { fileURLToPath } from 'url';

const app = express()
const __dirname = path.dirname(fileURLToPath(import.meta.url))
// import "body-parser" module
import bodyParser from 'body-parser';

app.use('/images', express.static(path.join(__dirname, 'public')));

const hostanme = "127.0.0.1"
const port = 3000

// app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
// app configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

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
app.use('/product',routeproduct)
app.use('/historique',historiqueRouter)
app.use(express.urlencoded({ extended: true }));
app.use('/posts',posteRoutes);
app.use('/comments',commentRoutes);
app.use("/users",usersRoutes);

app.use(notFoundError)






app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});


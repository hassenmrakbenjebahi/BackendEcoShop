import express from 'express';

import { notFoundError } from './middlewares/error.js';
import mongoose from 'mongoose';

import morgan from 'morgan';

import authRouter from './router/authRoute.js'

import path from 'path';
import { fileURLToPath } from 'url';

const app = express()
const __dirname = path.dirname(fileURLToPath(import.meta.url))


app.use('/images', express.static(path.join(__dirname, 'public')));

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


/*app.get('/images/:imageName', (req, res, next) => {
    const imagePath = path.join(__dirname, 'public', 'images', req.params.imageName);
    console.log('Requested Image Path:', imagePath);

    res.sendFile(imagePath, (err) => {
        if (err) {
            console.log('Error sending file:', err);

            if (err.code === 'ENOENT') {
                next(); 
            } else {
                next(err); // Pass the error to the error handling middleware
            }
        }
    });
});*/

/*app.use((err, req, res, next) => {
    console.error('Unexpected error:', err);
    if (!res.headersSent) {
        res.status(500).send('Internal Server Error');
    }
});

app.use((req, res) => {
    if (!res.headersSent) {
        res.status(404).send('Image not found');
    }
});*/




app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});


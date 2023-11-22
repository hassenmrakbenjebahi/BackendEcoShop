import express from 'express';
import { notFoundError } from './middlewares/error.js';
import mongoose from 'mongoose';
import morgan from 'morgan';
import authRouter from './router/authRoute.js'
import passport from 'passport';
import path from 'path';
import { fileURLToPath } from 'url';
import session from 'express-session';
import './utils/google.js'

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
    app.use(session({
        secret: 'bola-you-217', 
        resave: false,
        saveUninitialized: true,
      }));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
/*
app.get('/google',
passport.authenticate('google', { scope: ['profile', 'email'] })
);


app.get('/callback', 
  passport.authenticate('google', { 
    successRedirect: '/success', 
    failureRedirect: '/failed' 
  })
);

app.get('/success', (req, res) => {
    res.status(200).json({
      status: 'success',
      message: 'Authentification réussie',
      user: req.user 
    });
  });
  app.get('/failed', (req, res) => {
    res.status(401).json({
      status: 'failure',
      message: 'Échec de authentification'
    });
  });
*/
  
  app.use(passport.initialize());
  app.use(passport.session());
  app.use('/user',authRouter)
 


app.use(notFoundError)




app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});


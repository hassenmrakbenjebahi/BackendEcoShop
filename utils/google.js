
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import User from '../models/user.js'; 
import dotenv from 'dotenv';
import express from 'express';
dotenv.config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/callback",
    passReqToCallback: true
  },
  async (request, accessToken, refreshToken, profile, done)=> {
    console.log(profile)
    try{
        let user = await User.findOne({ googleId: profile.id });
        
        if (!user) {
            
            user = new User({
             
              Username: profile.displayName,
              email: profile.emails[0].value,
              Image: profile.photos[0].value,
              googleId: profile.id,
             
            });
      
            await user.save({ validateBeforeSave: false });
          }
          return done(null, user);
    }catch(err){
        return done(err);
    }
  }
));

passport.serializeUser(function (user, done) {
    done(null, user.id); 
  });
  
  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
  
  export default passport;


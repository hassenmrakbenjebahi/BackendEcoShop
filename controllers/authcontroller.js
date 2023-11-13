import User from "../models/user.js";
import jwt from 'jsonwebtoken';
import {CustomError} from "../middlewares/CustomError.js";
import asyncErrorHandler from "../middlewares/asyncErrorHandler.js";
import util from 'util';
import sendEmail from "../utils/email.js";
import crypto from "crypto"
import { error } from "console";
import { sendSMS } from "../utils/phone.js";
import { decode } from "punycode";
import user from "../models/user.js";





export async function getUsers(req, res, next) {
  try {
    const users = await User.find();
   
    
    res.status(200).json({
      status: 'success',
      data: {
        users,
      },
    });
  } catch (error) {
    next(error);
  }
}




const signToken = id =>{
    return jwt.sign({id}, 'bola-you-217',{
        expiresIn:'30d'
    })
}

/*const signup_Amdin = async (req, res) => {
    const { email, password ,name} = req.body;

    try{
      //  const user = await User.create({email,password,name,role:'admin',verified:false})
      //                         .then((result)=>{
      //                           sendVerificationEmail(result,res)
      //                         })
      const newUser = new User({
        email,
        password,
        name,
        image:`${req.protocol}://${req.get('host')}/img/${req.file.filename}`,
        role:"admin",
        verified:false
      });
      console.log("filename"+req.file.filename);

      newUser.save()
              .then((result)=>{
                console.log(result);
                sendVerificationEmail({ _id: result._id, email: result.email },res)
                
              })
              .catch((err)=>{
                console.log(err);
                res.json({
                  status:"Failed",
                  message :" An error was occured while saving User"
                })
              })



      const token = CreateToken(newUser._id)
      console.log(" user  token : "+ token);
      newUser.token = token;

    }catch(error){
            console.log(error);
            res.status(400).send("Bad request so Admin not created")
    }
  }
*/
 

export async function signup(req ,res,next) { 
    const {Username,email,password ,confirmPassword,phone} = req.body
    try{
        const newUser = new User({
          Username,
            email,
            password,
            confirmPassword,
            phone,
            Image: `${req.protocol}://${req.get('host')}/public/images/${req.file.filename}`, // Utilisez la bonne URL pour l'image
            
        })
         newUser.save()
        .then(async (result)=>{
          
          await sendEmail({
            email:newUser.email,
            subject:'	Welcome în Ecoshop',
           
        });
          console.log(result);
        res.status(201).json({user:newUser,
            message:"user has been succefully created"})
            
                })
        .catch((err)=>{
          console.log(err);
          res.json({
            status:"Failed",
            message :" An error was occured while saving User"
          })
        })




}catch(error){
      console.log(error);
      res.status(400).send("Bad request so Admin not created")
}}

export async function login (req,res,next){
    const email =req.body.email;
    const password =req.body.password;
    if(!email || !password){
        const error = new CustomError('please provide email ID & password for login',400);
        return next(error)
    }

    const user = await User.findOne({email}).select('+password');

    //const isMatch =await user.confirmPassword(password,user.password)

    if(!user || !(await user.comparePassword(password,user.password))){
        const error = new CustomError('Incorrect email or password',400);
        return next(error);
    }
    const token =signToken(user._id);
    res.status(200).json({
        status:'success',
        token,

    })
}

export const protect = asyncErrorHandler(async(req,res,next)=>{
    const testToken =req.headers.authorization
    let token;
    if(testToken && testToken.startsWith('bearer')){
        token=testToken.split(' ')[1];
    }
   
    if(!token){
        next(new CustomError('You are not logged in!',401))
    }
    const decodeToken = await util.promisify(jwt.verify)(token, 'bola-you-217');
    console.log(decodeToken)

    const user =await User.findById(decodeToken.id);
    if (!user){
        const error = new CustomError('the user withe given token does not exist',401);
        next(error);
    }
    next();
})


/*export const forgetPassword=  asyncErrorHandler(async(req,res,next)=>{
const user =await User.findOne({email: req.body.email});

if(!user){
    const error =await CustomError('We could not the user with given email',404)
    next(error);
}

const resetToken = user.createResetPasswordToken()
await user.save({validateBeforeSave: false});


const resetUrl = `${req.protocol}://${req.get('host')}/user/resetPassword/${resetToken}`;
const message = `we have received a password reset request. Please use the below link  to reset your password\n\n${resetUrl}\n\n this password link will be valid only for 10 minutes`;

try{
   await sendEmail({
        email:user.email,
        subject:'password change request received',
        message: message
    });
    res.status(200).json({
        status:'success',
        message:'password reset link send to the user email'
    })
}catch(err){
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpires = undefined;
    user.save({validateBeforeSave: false});


    return next(new CustomError('There was an error sending password reset email. Please try again later',500))
}


});*/
//forget avec email
/*export const forgetPassword=  asyncErrorHandler(async(req,res,next)=>{
  const user =await User.findOne({email: req.body.email});
  const random = await  user.generateCode() ;

  if(!user){
    const error =await CustomError('user not found',404)
    next(error);
}else{
  await user.updateOne({forgetPassword:random});
  const tokenData = {
    _id: user._id,
    email: user.email,
    code: random,
  };
  console.log("token code", random);
  const token = await user.createResetPasswordToken()
  const message = `we have received a password reset request.\n\nVerification code:${random}`
  try{
    await sendEmail({
         email:user.email,
         subject:'Reset your password',
         message: message
     });
     res.status(200).json({
         status:'success',
         message:'password reset link send to the user email',
         token: token
     })
 }catch(err){
     user.passwordResetToken = undefined;
     user.passwordResetTokenExpires = undefined;
    // user.save({validateBeforeSave: false});
 
 
     return next(new CustomError('There was an error sending password reset email. Please try again later',500))
 }
 
}

})*/
/*export const ResetPassword=  asyncErrorHandler(async(req,res,next)=>{
   const token = crypto.createHash('sha256').update(req.params.token).digest('hex')
    const user = await User.findOne({passwordResetToken:token, passwordResetTokenExpires: {$gt: Date.now()}})

    if(!user){
        const error =new CustomError('Token is invalid or has expired!',400);
        next(error)
    }
    user.password = req.body.password;
    user.confirmPassword = req.body.confirmPassword;
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpires = undefined;

    user.save();

    const logintoken =signToken(user._id);
    res.status(200).json({
        status:'success',
        token:logintoken

    })

});*/


export const forgetPassword=  asyncErrorHandler(async(req,res,next)=>{
  const user =await User.findOne({phone: req.body.phone});
  const random = await  user.generateCode() ;
  

  if(!user){
    const error =await CustomError('user not found',404)
    next(error);
}else{
  await user.updateOne({forgetPassword:random});
  user.code = random;
  await user.save({validateBeforeSave: false});
  const tokenData = {_id: user._id,email: user.email,code: random,};
  console.log("token code", random);
  const token = await user.generateToken( tokenData,'bola-you-217',"5h");

  //const message = `we have received a password reset request.\n\nVerification code:${random}`

  const smsSent = await sendSMS(user.phone, `Your verification code is: ${random}`);
  
 
  if (smsSent) {
    res.status(200).json({
      status: 'success',
      message: 'Verification code sent to user\'s phone',
      token:token
    });
  } else {
    // Gérez l'erreur si le SMS n'a pas pu être envoyé
    return next(new CustomError('There was an error sending the verification code via SMS. Please try again later', 500));
  }
 }
 
});



export const otp = asyncErrorHandler(async (req, res) => {
  const token = req.headers.authorization
  const decoded = jwt.verify(token, 'bola-you-217');
  const user = await User.findById(decoded._id);
  const code = decode.code

  const paramCode = req.body.code; 
  if (!user) {
    return res.status(404).json({ status: 'error', message: 'User not found' });
  }

  if (decoded.code.trim() === paramCode.trim()) {
 
    const tokenData = {_id: user._id, email: user.email,code : decoded.code};
    const token1 = await user.generateToken(tokenData, 'bola-you-217',"5m");
    res.status(200).json({ status: 'success',message:'code correct',token:token1});
  } else {
    // Les codes ne correspondent pas
    res.status(403).json({ status: 'error', message: 'Invalid code' });
  }
});


export const resetPassword= asyncErrorHandler (async(req, res) =>{

  const token = req.headers.authorization
  const decoded = jwt.verify(token, 'bola-you-217');
  const user = await User.findById(decoded._id);

  if (!user) {
    res.status(404).json("User not found");
  }
      if (req.body.password !== req.body.confirmPassword) {
      res.status(403).json("You have to confirm your password");
    } else {
      user.password = req.body.password;
     user.confirmPassword = req.body.confirmPassword;
     await user.save();
     res.status(200).json({status: 'success',message:'Password updated successfully'});
     
        
      }
});



import mongoose from "mongoose";
import validator from "validator";
import bcryptjs from "bcryptjs";
import crypto from "crypto"
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    Username: {
        type: String,
        
        required: function() { return !this.googleId; }
      },
      email:{
        type: String,
      required: true,
      unique: function() { return !this.googleId; },
      lowercase: true,
      validate:validator.isEmail
      },
      password:{
        type: String,
        required: function() { return !this.googleId; },
        "minLength": 8 , 
        select: false
      },
      confirmPassword:{
        type:String,
        required : function() { return !this.googleId; },
        validate:{validator: function(val){
            return val ==this.password
        },
        message:"Passwords are not the same"
    }
      },
      phone:{ 
        type:String,
        unique: true,
        required : function() { return !this.googleId; }
    
    },
    Image:{
      type: String
    },
    code : String,
    googleId: {
      type: String,
      unique: true,
      sparse: true, // Cela permet d'avoir des entrées sans googleId
    },
    //profileImg: String,
    passwordResetToken: String,
    passwordResetTokenExpires:Date
    
});

userSchema.pre('save', async function(next){
    if(!this.isModified('password'))
    return next()
    //encrypte pass
    this.password = await bcryptjs.hash(this.password, 12);

    this.confirmPassword= undefined;
    next();
})

userSchema.methods.generateCode= function() {
  const characters =
    "0123456789";
  let code = "";
  const codeLength = 4;

  for (let i = 0; i < codeLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters[randomIndex];
    
  }
  
  return code;
}

userSchema.methods.generateToken=  function(tokenData, secretKey, jwt_expire) {
  return jwt.sign(tokenData, secretKey, {expiresIn: jwt_expire});
}


userSchema.methods.createResetPasswordToken = function() {
const resetToken=crypto.randomBytes(32).toString('hex');
this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
this.passwordResetTokenExpires=Date.now() + 10 * 60 * 1000
console.log(resetToken,this.passwordResetToken)
return resetToken;
}




userSchema.methods.comparePassword = async function(pswd,pswDB) {
  return await bcryptjs.compare(pswd, pswDB);
};

export default mongoose.model("user", userSchema);

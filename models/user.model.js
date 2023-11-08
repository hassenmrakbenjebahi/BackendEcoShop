const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new mongoose.Schema({
  Firstname: {
    type: String,
    trim: true,
    required: true,
  },
  Lastname: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    //validate: validator.isEmail,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
    select: false,
  },
  confirmPassword: {
    type: String,
    required: true,
    /* validate:{validator: function(val){
          return val ==this.password
      },
      message:"Passwords are not the same"
  }*/
  },
  phone: {
    type: String,
    unique: true,
    required: true,
  },
  Image: {
    type: String,
  },
  code: String,
  //profileImg: String,
  passwordResetToken: String,
  passwordResetTokenExpires: Date,
});

module.exports = model("User", userSchema);

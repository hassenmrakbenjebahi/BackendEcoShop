import mongoose from "mongoose";
import validator from "validator";

const{Schema,model}=mongoose;

export const userSchema = new Schema({
    Username: {
        type: String,
        
      },
      email:{
        type: String,
     
      },
      password:{
        type: String,
        
      },
      confirmPassword:{
        type:String
     
      },
      phone:{ 
        type:String,
        
    
    },
    Image:{
      type: String
    }
  
    
});

export default model("user", userSchema);
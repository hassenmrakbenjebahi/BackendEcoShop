import mongoose from "mongoose";
import { userSchema } from "./user.js";
const{Schema,model}=mongoose;

export const commentSchema= new Schema({
    content:{type:String,
             required:true
           },
    author: {
              type:String,
            },
    date: { type: Date, default: Date.now },
    user:[userSchema]

});
export default model('Comment',commentSchema);
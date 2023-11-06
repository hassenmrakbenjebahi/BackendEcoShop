import mongoose from "mongoose";
const{Schema,model}=mongoose;

export const commentSchema= new Schema({
    content:{type:String,
             required:true
           },
    author: {
              type:String,
              required:true
            },
    date: { type: Date, default: Date.now }

});
export default model('Comment',commentSchema);
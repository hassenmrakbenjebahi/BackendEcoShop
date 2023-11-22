import mongoose from "mongoose";
const{Schema,model}=mongoose;

export const commentSchema= new Schema({
    content:{type:String,
             required:true
           },
    
    date: { type: Date, default: Date.now },
    iduser:{type:String},
    idpost:{type:String}

});
export default model('Comment',commentSchema);
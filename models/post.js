import mongoose from "mongoose";
import { commentSchema } from "./comment.js";
import {userSchema} from "./user.js"
//import Comment from "./comment";
const{Schema,model}=mongoose;

const postSchema= new Schema({
    author:{type:String,
           },       // L'auteur de la publication
    content: {
           type:String,
            },       // Le texte du post
    media:{
            type:String,
          },           // L'URL de la vidéo ou de l'image
    publicationDate: { type: Date, default: Date.now }, // Date de publication
    comments: [commentSchema],// liste commentaires
    likes: [{ type: String }], // Liste des utilisateurs qui ont aimé la publication
    user:[userSchema]

});
export default model('Post',postSchema);
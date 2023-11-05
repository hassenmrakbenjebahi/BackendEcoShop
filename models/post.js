import mongoose from "mongoose";
import comment from "./comment";
const{Schema,model}=mongoose;

const postSchema= new Schema({
    author:{type:String,
            required:true  
           },       // L'auteur de la publication
    content: {
           type:String,
           required:true
            },       // Le texte du post
    media:{
            type:String,
            required:true         
          },           // L'URL de la vidéo ou de l'image
    publicationDate: { type: Date, default: Date.now }, // Date de publication
    comments: [comment],// liste commentaires
    likes: [{ type: String }], // Liste des utilisateurs qui ont aimé la publication

});
export default model('Post',postSchema);
import mongoose from "mongoose";
//import Comment from "./comment";
const{Schema,model}=mongoose;

const postSchema= new Schema({
  
    content: {
           type:String,
            },       // Le texte du post
    media:{
            type:String,
          },           // L'URL de la vidéo ou de l'image
    publicationDate: { type: Date, default: Date.now }, // Date de publication
    
    likes: [{ type: String }], // Liste des utilisateurs qui ont aimé la publication
   
    iduser:{type:String}

});
export default model('Post',postSchema);
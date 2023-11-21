import Post from '../models/post.js';
import user from '../models/user.js';
import { validationResult } from 'express-validator'; // Importer express-validator



export function addOnce(req,res){
  if(!validationResult(req).isEmpty()) {
    res.status(400).json({ errors: validationResult(req).array() });
}else{
    Post.create({
         content:req.body.content,
         // Récupérer l'URL de le media pour l'insérer dans la BD
         media: `${req.protocol}://${req.get('host')}/media/${req.file.filename}`,


         
       }).
    then((newpost)=>{
    res.status(200).json(
        {
            id:newpost._id,
            content:newpost.content,
            media:newpost.media,
            publicationDate:newpost.publicationDate,
            likes:[]
        });
     }).catch((err)=>{
        res.status(500).json({error:err});
     });
  }
}

export function getAll(req,res){
    Post.find({}).then((docs)=>{
        let list=[];
        for(let i=0;i<docs.length;i++){
            list.push({
                id:docs[i]._id,
                content:docs[i].content,
                publicationDate:docs[i].publicationDate,
                likes:docs[i].likes,
                iduser:docs[i].iduser,
                media:docs[i].media
            });
        }  
        res.status(200).json(list)
    })
    .catch((err)=>{
        res.status(500).json({error:err});
    });
}


export function getOnce(req, res) {
    Post.findById(req.params.id)
      .then((doc) => {
        res.status(200).json(doc);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  }

export function putOne(req,res){
    Post.findByIdAndUpdate(req.params.id,req.body)
    .then((doc1)=>{
      Post.findById(req.params.id).then((doc2)=>{
        res.status(200).json(doc2);
      }).catch((err)=>{
        res.status(500).json({error:err});
      });     
    }).catch((err)=>{
        res.status(500).json({error:err});
    });
} 

export function deleteOne(req,res){
    Post.findByIdAndDelete(req.params.id)
   .then((deletedPost) => {
     if (!deletedPost) {
        res.status(500).json({error:"post not found"})
    } else {
        res.status(200).json({postdeleted:deletedPost})
    }
  })
  .catch((err) => {
    res.status(500).json({error:err})
  });
   

}









export function addPost(req, res) {
  // Recherchez le post par son ID
  user.findById(req.params.id)
      .then(doc => {
          if (!doc) {
              res.status(404).json({ error: "user non trouvé" });
          } else {
             // Créez le post en utilisant les données de la requête
             const newPost = {
              content: req.body.content,
              //media: `${req.protocol}://${req.get('host')}/public/images/${req.file.filename}`,
              iduser: req.params.id // Ajoutez l'id du user à iduser du post
          };
              Post.create(newPost)
                  .then(newpost => {
                   
                    res.status(200).json(newpost);

                  })
                  .catch(err => {
                    res.status(500).json({ error: "Erreur lors de la création du post :", err });
                });
                  
          }
      })
      .catch(err => {
          res.status(500).json({ error: "Erreur lors de la recherche du user :", err });
      });
}


export function addlike(req, res) {
  // Recherchez le post par son ID
  Post.findById(req.params.id)
      .then(post => {
          if (!post) {
              res.status(404).json({ error: "Post non trouvé" });
          } else {
              user.findById(req.params.idu).then((us)=>{
                  if(!us){
                      res.status(404).json({error:"user non trouvé"})
                  }else{
                    let indexAEnlever = post.likes.indexOf(req.params.idu);
                       if(indexAEnlever== -1){
                      post.likes.push(req.params.idu)
                       }
                       post.save()

                      .then((p) => {
                          res.status(200).json(p);
                      })
                      .catch(err => {
                          res.status(500).json({ error: "Erreur lors de l'enregistrement du user ou du like post mis à jour.", err });
                      });
                       
                      

                  }
              }
               
              )
              
          }
      })
      .catch(err => {
          res.status(500).json({ error: "Erreur lors de la recherche du post :", err });
      });
}


export function retireLike(req,res){
 
 // Recherchez le post par son ID
 Post.findById(req.params.id)
 .then(post => {
     if (!post) {
         res.status(404).json({ error: "Post non trouvé" });
     } else {
         user.findById(req.params.idu).then((us)=>{
             if(!us){
                 res.status(404).json({error:"user non trouvé"})
             }else{
              let indexAEnlever = post.likes.indexOf(req.params.idu);
              if(indexAEnlever !== -1){

                 post.likes.splice(indexAEnlever,1)
                 }
                 post.save()
                 .then((p) => {
                     res.status(200).json(p);
                 })
                 .catch(err => {
                     res.status(500).json({ error: "Erreur lors de l'enregistrement du user ou du like post mis à jour.", err });
                 });
                  
                 

             }
         }
          
         )
         
     }
 })
 .catch(err => {
     res.status(500).json({ error: "Erreur lors de la recherche du post :", err });
 });
}
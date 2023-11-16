import Post from '../models/post.js';
import user from '../models/user.js';
import { validationResult } from 'express-validator'; // Importer express-validator



export function addOnce(req,res){
  if(!validationResult(req).isEmpty()) {
    res.status(400).json({ errors: validationResult(req).array() });
}else{
    Post.create({
         author:req.body.author,
         content:req.body.content,
         // Récupérer l'URL de le media pour l'insérer dans la BD
         media: `${req.protocol}://${req.get('host')}/media/${req.file.filename}`,
         comment:req.body.comment,
         likes:req.body.likes


         
       }).
    then((newpost)=>{
    res.status(200).json(
        {
            id:newpost._id,
            author:newpost.author,
            content:newpost.content,
            media:newpost.media,
            publicationDate:newpost.publicationDate,
            comment:[],
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
                author:docs[i].author,
                content:docs[i].content,
                publicationDate:docs[i].publicationDate,
                comment:docs[i].comments,
                likes:[],
                user:docs[i].user
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
              Post.create(req.body)
                  .then(newpost => {
                    newpost.user.push(doc);
                    newpost.save()
                    res.status(200).json(newpost);

                  })
                  
          }
      })
      .catch(err => {
          res.status(500).json({ error: "Erreur lors de la recherche du user :", err });
      });
}
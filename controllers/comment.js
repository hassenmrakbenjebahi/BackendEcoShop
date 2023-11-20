import Comment from '../models/comment.js';
import Post from '../models/post.js';
import user from '../models/user.js';


export function addOnce(req, res) {
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
                        const newComment={
                            content:req.body.content,
                            iduser:req.params.idu,
                            idpost:req.params.id
                           }
                        Comment.create(newComment)
                        .then((newcomment) => {
                            res.status(200).json(newcomment);
                        })
                        .catch(err => {
                            res.status(500).json({ error: "Erreur lors de l'enregistrement du commentaire ou du post mis à jour.", err });
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




export function getAllCommentPost(req,res){
 Comment.find({ idpost: req.params.id }).then(doc =>{
    res.status(201).json(doc)
 }) .catch((err)=>{
    res.status(500).json({error:err});
});   
}
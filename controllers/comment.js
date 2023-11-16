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
                        Comment.create({
                            content:req.body.content
                        }).then(newcomment => {
                            newcomment.user.push(us);
                            post.comments.push(newcomment);
                            

                            return Promise.all([newcomment.save(), post.save()]);

                        }).then((newcomment) => {
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





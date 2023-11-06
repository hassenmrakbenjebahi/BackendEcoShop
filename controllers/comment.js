import Comment from '../models/comment.js';
import Post from '../models/post.js'


export function addOnce(req, res) {
    // Recherchez le post par son ID
    Post.findById(req.params.id)
        .then(post => {
            if (!post) {
                res.status(404).json({ error: "Post non trouvé" });
            } else {
                Comment.create(req.body)
                    .then(newcomment => {
                        post.comments.push(newcomment);
                        return Promise.all([newcomment.save(), post.save()]);
                    })
                    .then(() => {
                        res.status(200).json({ success: "Commentaire ajouté avec succès au post." });
                    })
                    .catch(err => {
                        res.status(500).json({ error: "Erreur lors de l'enregistrement du commentaire ou du post mis à jour.", err });
                    });
            }
        })
        .catch(err => {
            res.status(500).json({ error: "Erreur lors de la recherche du post :", err });
        });
}
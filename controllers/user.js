import user from "../models/user.js"

export function getUserConnected(req,res){
    user.findById(req.params.id).then(
        (doc)=>{
            const docs = {
                 id : doc._id,
                 username:doc.Username
            }
            res.status(201).json(docs)
        }
    ).catch((err) => {
        res.status(500).json({ error: err });
      });
}
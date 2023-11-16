import user from "../models/user.js"

export function getUserConnected(req,res){
    user.findById(req.params.id).then(
        (doc)=>{
            
            res.status(201).json(doc)
        }
    ).catch((err) => {
        res.status(500).json({ error: err });
      });
}
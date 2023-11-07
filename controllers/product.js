import product from './models/product.js'


export function addOnce(req,res){
  
    Post.create({
         name:req.body.name,
         description:req.body.description,
         image: `${req.protocol}://${req.get('host')}/img/${req.file.filename}`,
         code:req.body.code,
         isDanger:req.body.isDanger  
       }).
    then((newproduct)=>{
    res.status(200).json(
        {
            id:newproduct._id,
            name:newproduct.name,
            code:newproduct.code,
            image:newproduct.img,
            isDanger:newproduct.isDanger       });
     }).catch((err)=>{
        res.status(500).json({error:err});
     });
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
                likes:[]
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
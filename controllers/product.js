import product from '../models/product.js';
import Product from '../models/product.js';


export function addOnce(req,res){

    product.create({
         name:req.body.name,
         categorie:req.body.categorie,
         // Récupérer l'URL de le media pour l'insérer dans la BD
         image: `${req.protocol}://${req.get('host')}/img/${req.file.filename}`,
         price:req.body.price

         
       }).
    then((newProduct)=>{
    res.status(200).json(
        {
            id:newProduct._id,
            name:newProduct.name,
            categorie:newProduct.categorie,
            image:newProduct.image,
            price:newProduct.price
        });
     }).catch((err)=>{
        res.status(500).json({error:err});
     });
  
}






export function getAll(req, res) {
  Product.find({})
    .then((docs) => {
      let list = []
      for(let i=0;i<docs.length;i++){
        list.push({
          id:docs[i]._id,
          name:docs[i].name,
          categorie:docs[i].categorie,
          image:docs[i].image,
          price:docs[i].price
          
          
      });
      }
      res.status(200).json(list);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
}

export async function getOnce(req, res) {
 const prod = await Product.findOne({code: req.body.code})

 if(!prod){
  return res.status(404).json({ status: 'error', message: 'Product not found' });
 }else{
  res.status(200).json({ 
    name : prod.name,
    description : prod.description
  });
 }
}

export function putOne(req, res) {
  Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((doc) => {
      if (!doc) {
        res.status(404).json({ error: 'Product not found' });
      } else {
        res.status(200).json(doc);
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
}

export function deleteOne(req, res) {
  Product.findByIdAndDelete(req.params.id)
    .then((deletedProduct) => {
      if (!deletedProduct) {
        res.status(404).json({ error: 'Product not found' });
      } else {
        res.status(200).json({ productDeleted: deletedProduct });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
}

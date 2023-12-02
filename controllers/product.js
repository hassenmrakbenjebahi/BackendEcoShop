import Product from '../models/product.js';

export function addOnce(req, res) {
  const { name, description, code,carbonFootPrint,waterConsumption,recyclability } = req.body;

  const newProduct = new Product({
    name,
    description,
    //const image = `${req.protocol}://${req.get('host')}/img/${req.file.filename}`;
    image: `${req.protocol}://${req.get("host")}${process.env.IMGURL}/${req.file.filename}`,
    code,
    carbonFootPrint,
    waterConsumption,
    recyclability
  });

  newProduct
    .save()
    .then((newProduct) => {
      res.status(200).json({
        name: newProduct.name,
        description: newProduct.description,
        code: newProduct.code,
        carbonFootPrint: newProduct.carbonFootPrint,
        waterConsumption: newProduct.waterConsumption,
        recyclability: newProduct.recyclability
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
}

export function getAll(req, res) {
  Product.find({})
    .then((docs) => {
      res.status(200).json(docs);
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

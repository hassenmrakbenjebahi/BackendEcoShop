import Product from '../models/product.js';

export function addOnce(req, res) {
  const { name, description, code,carbonFootPrint,waterConsumption,recyclability } = req.body;
  //const image = `${req.protocol}://${req.get('host')}/img/${req.file.filename}`;

  const newProduct = new Product({
    name,
    description,
    image: `${req.protocol}://${req.get('host')}/public/images/${req.file.filename}`,
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
        image: newProduct.image,
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

export async function getAll(req, res) {
  try {
    const docs = await Product.find()
    return res.json({
      statusCode: 200,
      products: docs
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      statusCode: 500,
      msg: 'Error retrieving histories' });
  }
};


// get Product By Id
export async function getProductById (req, res){
  try {
    const prod = await Product.findById(req.params.productId)
    if (!prod) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({
      statusCode: 200,
      product: prod});
  } catch (error) {
    res.status(500).json({ error: 'Error Server' });
  }
};

// Search Product By Name || Code
export async function getByNameAndByCode(req, res) {
  try {
    const docs = await Product.find({name: req.body.name} || {code: req.body.code})
    return res.json({
      statusCode: 200,
      products: docs
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      statusCode: 500,
      msg: 'Error retrieving histories' });
  }
};

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
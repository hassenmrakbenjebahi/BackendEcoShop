import Product from '../models/product.js';

export function addOnce(req, res) {
  const { name, description, code, isDanger } = req.body;
  const image = `${req.protocol}://${req.get('host')}/img/${req.file.filename}`;

  const newProduct = new Product({
    name,
    description,
    image,
    code,
    isDanger,
  });

  newProduct
    .save()
    .then((newProduct) => {
      res.status(200).json({
        id: newProduct._id,
        name: newProduct.name,
        code: newProduct.code,
        image: newProduct.image,
        isDanger: newProduct.isDanger,
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

export function getOnce(req, res) {
  Product.findById(req.params.id)
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

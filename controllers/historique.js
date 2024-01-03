import Historique from "../models/historique.js";
import Product from "../models/product.js";

//APIs pour le développement dashboard admin concernant les produits enregistrés dans les historiques

// Get tous les produits enregistrés dans les historiques et Pagination
export async function getAllHistory(req, res) {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const histories = await Historique.find()
    .populate('productId')
    .skip(startIndex)
    .limit(limit);

  const totalHistories = await Historique.countDocuments();

  console.log({ 
    histories: histories, 
    totalHistories: totalHistories 
  });
  res.status(200).json({ 
    histories: histories, 
    totalHistories: totalHistories 
  });
}

// export async function getAllHistory(req, res) {
//   // Récupération des paramètres de recherche et de tri
//   const searchQuery = req.query.searchQuery || '';
//   const sortField = req.query.sortField || 'date';
//   const page = parseInt(req.query.page) || 1;
//   const limit = parseInt(req.query.limit) || 10;

//   // Construction de la requête de recherche
//   const searchQueryObj = {};
//   if (searchQuery) {
//     searchQueryObj.$text = { $search: searchQuery };
//   }

//   // Construction de la requête de tri
//   const sortObj = {};
//   sortObj[sortField] = 1;

//   // Pagination
//   const startIndex = (page - 1) * limit;
//   const endIndex = page * limit;

//   // Récupération des historiques
//   const histories = await Historique.find(searchQueryObj)
//     .populate('productId')
//     .sort(sortObj)
//     .skip(startIndex)
//     .limit(limit);

//   // Récupération du nombre total d'historiques
//   const totalHistories = await Historique.countDocuments(searchQueryObj);

//   // Envoi de la réponse
//   res.status(200).json({
//     histories: histories,
//     totalHistories: totalHistories,
//   });
// }

// Search
export async function searchHistory(req, res) {
  const searchQuery = {};
  if (req.query.productId) {
    searchQuery.productId.name = mongoose.Types.ObjectId(req.query.productId.name);
    searchQuery.productId.brand = mongoose.Types.ObjectId(req.query.productId.brand);
    searchQuery.productId.category = mongoose.Types.ObjectId(req.query.productId.category);
  }
  if (req.query.date) {
    searchQuery.date = { $gte: new Date(req.query.date) };
  }

  const histories = await Historique.find(searchQuery).populate('productId');

  res.json({ searcHistories: histories });
}

// Sorting
export async function sortHistory(req, res) {
  const sortField = req.params.field;

  const histories = await Historique.find()
    .populate('productId')
    .sort({ [sortField]: 1 });

  res.json({ 
    sortHistories: histories 
  });
}

// Statistics
export async function getHistoryStats(req, res) {
  const stats = await Product.aggregate([
    {
      $lookup: {
        from: 'historiques',
        localField: '_id',
        foreignField: 'productId',
        as: 'historiques',
      },
    },
    { $match: { 'historiques': { $ne: [] } } },
    {
      $group: {
        _id: 2,
        totalEmissions: { $sum: '$carbonFootPrint' },
        totalWaterConsumption: { $sum: '$waterConsumption' },
        totalRecyclability: { $sum: '$recyclability' },

        averageEmissions: { $avg: '$carbonFootPrint' },
        averageWaterConsumption: { $avg: '$waterConsumption' },
        averageRecyclability: { $avg: '$recyclability' },
        // Ajoutez d'autres statistiques si nécessaire
      },
    },
  ]);

  res.status(200).json({ stats: stats });
}

// Analysis
export async function getHistoryAnalysis(req, res) {
  const analysisType = req.params.type;

  const analysis = {};

  switch (analysisType) {
    case 'category':
      analysis.salesByCategory = await getSalesByCategoryFromHistory();
      break;
    case 'brand':
      analysis.salesByBrand = await getSalesByBrandFromHistory();
      break;
    case 'best-sellers':
      analysis.bestSellers = await getBestSellersFromHistory();
      break;
    case 'eco-friendly':
      analysis.ecoFriendlyProducts = await getEcoFriendlyProductsFromHistory();
      break;
    default:
      res.status(400).json({ error: 'Invalid analysis type' });
      return;
  }

  res.json({ analysis });
}

// Sales by category
export async function getSalesByCategoryFromHistory() {
  const salesByCategory = await Product.aggregate([
    {
      $lookup: {
        from: 'historiques',
        localField: '_id',
        foreignField: 'productId',
        as: 'historiques',
      },
    },
    { $match: { 'historiques': { $ne: [] } } },
    { $group: { _id: '$category', sales: { $sum: 1 } } }, // Compter les enregistrements
  ]);

  return salesByCategory;
}

// Sales by Brand
export async function getSalesByBrandFromHistory() {
  const salesByBrand = await Product.aggregate([
    {
      $lookup: {
        from: 'historiques',
        localField: '_id',
        foreignField: 'productId',
        as: 'historiques',
      },
    },
    { $match: { 'historiques': { $ne: [] } } },
    { $group: { _id: '$brand', sales: { $sum: 1 } } }, // Compter les enregistrements
  ]);

  return salesByBrand;
}

// Best Sellers
export async function getBestSellersFromHistory() {
  const bestSellers = await Product.aggregate([
    {
      $lookup: {
        from: 'historiques',
        localField: '_id',
        foreignField: 'productId',
        as: 'historiques',
      },
    },
    { $match: { 'historiques': { $ne: [] } } },
    { $group: { _id: '$_id', sales: { $sum: 1 } } }, // Compter les enregistrements
    { $sort: { sales: -1 } }, // Trier par nombre de ventes
    { $limit: 10 }, // Limiter à 10 produits
  ]);

  return bestSellers;
}

// EcoFriendly Products
export async function getEcoFriendlyProductsFromHistory() {
  const ecoFriendlyProducts = await Product.aggregate([
    { $match: { $and: [{ carbonFootPrint: { $lt: 25 } }, { waterConsumption: { $lt: 500 } }, { recyclability: { $gt: 80 } }] } }, // Critères de base
    { $addFields: { // Calculer un score "écoresponsable"
      ecoScore: {
        $add: [
          { $multiply: [100, { $divide: [80, '$recyclability'] }] },
          { $multiply: [50, { $divide: [500, '$waterConsumption'] }] },
          { $multiply: [25, { $divide: [25, '$carbonFootPrint'] }] },
        ],
      },
    } },
    { // Trier par empreinte carbone, consommation d'eau, recyclabilité et score "écoresponsable"
      $sort: { carbonFootPrint: 1, waterConsumption: 1, recyclability: -1, ecoScore: -1 } },
    { $limit: 10 }, // Limiter à 10 produits
  ]);

  return ecoFriendlyProducts;
}


// ***********************************************************************************
// add Product To History
export async function addToHistory(req, res) {
  try {
    const { userId, productId } = req.body;

    // Rechercher le produit existant
    const existingProduct = await Product.findById(productId);

    if (existingProduct) {
      // Incrémenter le champ sales
      existingProduct.sales++;
      await existingProduct.save();
    } else {
      // Ajouter un nouveau produit avec sales = 1
      const newProduct = await Product.create({
        sales: 1, // Assurez-vous que la valeur initiale de sales est un nombre
      });
    }

    const newHistoryEntry = await Historique.create({ userId, productId });

    res.status(201).json(newHistoryEntry);
  } catch (error) {
    if (error.name === 'ValidationError' && error.errors.sales) {
      return res.status(400).json({ message: 'Invalid sales value' });
    }
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}


// export async function addToHistory (req, res){
//   try {
//     const { userId, productId } = req.body;
//     const newHistoryEntry = await Historique.create({ userId, productId });
//     console.log(newHistoryEntry);
//     res.status(201).json(newHistoryEntry);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// get the history of user By userId
export async function getUserHistory (req, res) {
  try {
    const userId = req.params.userId;
    const userHistory = await Historique.find({ userId }).populate("productId");
    res.status(200).json(userHistory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// delete History By Id
export async function deleteFromHistory (req, res) {
  try {
    const historyId = req.params.historyId;
    await Historique.findByIdAndDelete(historyId);
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// get the details of product
export async function getProductDetails (req, res) {
  try {
    const productId = req.params.productId;
    const productDetails = await Product.findById(productId);
    console.log(productDetails);
    res.status(200).json(productDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


// get history By Id
export async function getHistoryById (req, res){
  try {
    const histo = await Historique.findById(req.params.historyId);
    if (!histo) {
      return res.status(404).json({ error: 'Histo not found' });
    }
    console.log(histo);
    res.status(200).json({Histo: histo});
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
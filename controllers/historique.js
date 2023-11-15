import Historique from "../models/historique.js";

// add To History
export async function addToHistory (req, res){
    try {
      const historique = new Historique(req.body)
      const savedHistorique = await historique.save()
      res.status(201).json(savedHistorique);
    } catch (error) {
      res.status(400).json({ error: 'Error creating history' })
    }
};

// get all history 
export async function getAllHistory (req, res) {
    try {
      const histories = await Historique.find().populate("userId")
      res.json({Histories: histories});
    } catch (error) {
      res.status(500).json({ error: 'Error retrieving histories' });
    }
};

// get History By Id
export async function getHistoryById (req, res){
    try {
      const history = await Historique.findById(req.params.historyId)
      .populate("userId")
      .populate("productId")
      .populate("impactId")
      if (!history) {
        return res.status(404).json({ error: 'History not found' });
      }
      res.json(history);
    } catch (error) {
      res.status(500).json({ error: 'Error retrieving history' });
    }
};

// delete History By Id
export function deleteHistory (req, res) {
    try {
      Historique.deleteOne({_id: req.params.historyId}).then((response)=>{
        response.deletedCount ?
        res.json({msg : "delete History with success"}) :
        res.json({msg: "ERROR 404"})
    })
    } catch (error) {
      res.status(500).json({ error: 'Error deleting history' });
    }
};


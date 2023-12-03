import Historique from "../models/historique.js";

// add Product To History
export async function addToHistory (req, res){
    try {
      const historique = new Historique(req.body)
      const savedHistorique = await historique.save()
      res.status(200).json({Added : savedHistorique});
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' })
    }
};

// get all history By UserId
export async function getAllHistory (req, res) {
    try {
      const histories = await Historique.find({userId : req.params.historyByUserId})
      //.populate("userId")
      .populate("productId")
      res.status(200).json({Histories: histories});
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
};

// delete History By Id
export function deleteHistory (req, res) {
    try {
      Historique.deleteOne({_id: req.params.historyId}).then((response)=>{
        response.deletedCount ?
        res.status(200).json({msg : "delete History with success"}) :
        res.status(404).json({msg: "Error deleting history"})
    })
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
};

//**************************************************************************

// get all history
export async function getAllHistory2 (req, res) {
  try {
    const histories = await Historique.find()
    .populate("userId")
    .populate("productId")
    res.json({Histories: histories});
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving histories' });
  }
};


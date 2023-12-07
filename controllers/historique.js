import Historique from "../models/historique.js";

// add Product To History
export async function addToHistory (req, res){
    try {
      const historique = new Historique(req.body)
      const savedHistorique = await historique.save()
      return res.status(200).json({
        statusCode: 200,
        Added : savedHistorique});
    } catch (error) {
      console.error(error);
      return res.status(500).json({ 
        statusCode: 500,
        msg: 'Internal server error' })
    }
};

// get all history By UserId
export async function getAllHistory (req, res) {
    try {
      const histories = await Historique.find({userId : req.params.historyByUserId})
      //.populate("userId")
      .populate("productId")
      return res.status(200).json({
        statusCode: 200,
        histories: histories});
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        statusCode: 500,
        msg: 'Internal server error' });
    }
};

// delete History By Id
export function deleteHistory (req, res) {
    try {
      Historique.deleteOne({_id: req.params.historyId}).then((response)=>{
        response.deletedCount ?
        res.status(200).json({
          statusCode: 200,
          msg : "delete History with success"}) :
        res.status(404).json({
          statusCode: 400,
          msg: "Error deleting history"})
    })
    } catch (error) {
      console.error(error);
      res.status(500).json({ 
      statusCode: 500,
      msg: 'Internal server error' });
    }
};

//**************************************************************************

// get all history
export async function getAllHistory2 (req, res) {
  try {
    const histories = await Historique.find()
    .populate("userId")
    .populate("productId")
    return res.json({
      statusCode: 200,
      Histories: histories});
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      statusCode: 500,
      msg: 'Error retrieving histories' });
  }
};


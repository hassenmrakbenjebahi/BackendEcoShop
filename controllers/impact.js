import Impact from "../models/impact.js";

// add Impact
export async function addImpact (req, res){
    try {
      const impact = new Impact(req.body);
      const savedImpact = await impact.save();
      res.status(201).json(savedImpact);
    } catch (error) {
      res.status(400).json({ error: 'Error creating impact' });
    }
};

// get All Impacts
export async function getAllImpacts (req, res) {
    try {
      const impacts = await Impact.find();
      res.json({impacts: impacts});
    } catch (error) {
      res.status(500).json({ error: 'Error retrieving impacts' });
    }
};

// get Impact By Id
export async function getImpactById (req, res){
    try {
      const impact = await Impact.findById(req.params.impactId);
      if (!impact) {
        return res.status(404).json({ error: 'Impact environnemental not found' });
      }
      res.json({impact: impact});
    } catch (error) {
      res.status(500).json({ error: 'Error retrieving impact' });
    }
};

// delete Impact by Id
export function deleteImpact (req, res){
    try {
     Impact.deleteOne({_id: req.params.impactId}).then((response)=>{
        response.deletedCount ?
        res.json({msg : "delete Impact with success"}) :
        res.json({msg: "ERROR 404"})
    })
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Error deleting Impact' });
    }
};

// update Impact
export async function updateImpact (req, res){
    try {
      const updateImpact = await Impact.findByIdAndUpdate(
        req.params.impactId,
        req.body,
        { new: true });
      if (!updateImpact) {
        return res.status(404).json({ error: 'Impact not found' });
      }
      res.json(updateImpact);
    } catch (error) {
      res.status(500).json({ error: 'Error updating Impact' });
    }
};

import express from 'express';
import * as impact from '../controllers/impact.js';
const router = express.Router();

router.post("/addImpact", impact.addImpact);

router.get("/getAllImpacts", impact.getAllImpacts);

router.get("/getImpactById/:impactId", impact.getImpactById);

router.delete("/deleteImpact/:impactId", impact.deleteImpact);

router.put("/updateImpact/:impactId", impact.updateImpact);

export default router;
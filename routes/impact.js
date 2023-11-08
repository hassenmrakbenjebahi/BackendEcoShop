import express from 'express';
import * as impact from '../controllers/impact.js';

const router = express.Router();

router.route("")
    .post(impact.addImpact)
    .get(impact.getAllImpacts)

router.route("/:impactId")
    .get(impact.getImpactById)
    .delete(impact.deleteImpact)
    .put(impact.updateImpact)


export default router;
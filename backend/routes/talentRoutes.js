import express from "express";
import { createTalent, getTalents } from "../controllers/talentController.js";
import validateRequest from "../middleware/validateRequest.js";
import { createTalentSchema } from "../validators/talentValidator.js";

const router = express.Router();

router.route("/")
  .get(getTalents)      
  .post(validateRequest(createTalentSchema), createTalent); 

export default router;

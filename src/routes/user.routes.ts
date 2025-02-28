import express from "express";
import { Request, Response } from "express";
import surveyController from "../controllers/surveyControllers";

const router = express.Router();

router.post('/survey', surveyController.createSurvey as any);
router.get('/surveys', surveyController.fetchAllSurveys as any);

export default router 
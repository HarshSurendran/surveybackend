import express from "express";
import { Request, Response } from "express";
import surveyController from "../controllers/survey.controllers";

const router = express.Router();

router.post('/survey', surveyController.createSurvey);
router.get('/surveys', surveyController.fetchAllSurveys);

export default router 
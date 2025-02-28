import { NextFunction, Request, Response } from "express";
import { ISurvey } from "../models/survey.schema";
import surveyService from "../services/survey.service"
import adminService from "../services/admin.service";

const createSurvey = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const surveyData: ISurvey = req.body;
        const response = await surveyService.createSurvey(surveyData);
        res.status(200).json({status: true, message:'Survey submission form successfully created',response});
    } catch (error) {
        next(error);
    }
}

const fetchAllSurveys = async (req:Request,res:Response,next:NextFunction) => {
    try {
        const search = req.query.searchTerm ? String(req.query.searchTerm) : '';
        const currentPage = req.query.page ? Number(req.query.page) : 1;
        const itemsPerPage = req.query.limit ? Number(req.query.limit) : 5;
        
        const params ={
            search:search as string,
            page: currentPage as number,
            limit: itemsPerPage as number
        }

        const response = await adminService.getSurveySubmission(params)
        res.status(200).json({ status: true, message:'data fetched', data: {surveys:response.surveys, totalDocs: response.totalItems }, })
    } catch (error) {
        next(error)
    }
}

export default { createSurvey, fetchAllSurveys }
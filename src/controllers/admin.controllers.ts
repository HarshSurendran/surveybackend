import { NextFunction, Request, Response } from "express"
import { validationResult } from "express-validator"
import adminService from "../services/admin.service"

const login = async (req:Request,res:Response,next:NextFunction) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.status(400).json({errors:errors.array()})
        }
        const response = await adminService.login(req.body)
        res.status(200).json({ status: true, message: 'Login successful', data: { token: response } })
    } catch (error) {
        next(error)
    }
}


const fetchAllSurveys = async (req:Request,res:Response,next:NextFunction) =>{
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


export =  {
    login,
    fetchAllSurveys
} 
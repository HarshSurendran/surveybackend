import Survey, { ISurvey } from "../models/survey.schema";
import CustomError from "../utils/custom.error";


const createSurvey = async (surveyData: ISurvey) => {
    try {
        
        const survey = new Survey(surveyData);
        const validationError = survey.validateSync();
        if(validationError){
            throw new CustomError((Object.values(validationError.errors)[0].message|| 'validation error'),405)
        }
        await survey.save();
        return survey;
    } catch (error) {
        throw error
    }
}


export default { createSurvey }



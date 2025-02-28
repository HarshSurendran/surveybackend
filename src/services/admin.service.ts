import Admin, { IAdmin } from "../models/admin.schema";
import Survey from "../models/survey.schema";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import CustomError from "../utils/custom.error";


interface IParams {
    search: string;
    page: number
    limit: number
}

const login = async (data: IAdmin) => {
    try {
        const checkAdmin = await Admin.findOne({ email: data.email })
        if (!checkAdmin || !data.password) {
            throw new CustomError("Sorry! Email not registered.", 401)
        }
        const isMatch = checkAdmin?.password ? await bcrypt.compare(data.password, checkAdmin.password) : false

        if (!isMatch) {
            throw new CustomError('Invalid credentials', 401)
        }
        const secretKey = process.env.JWT_SECRET
        if (!secretKey) {
            throw new CustomError('Sorry! No JWT secret found', 402)
        }
        const token = jwt.sign(
            { id: checkAdmin?._id }, secretKey as string, { expiresIn: '1h' }
        )
        return token
    } catch (error) {
        console.log(error, "error froma admin service");
        throw error
    }
}


const getSurveySubmission = async (params: IParams) => {
    try {
        const { search, page, limit } = params
        
        const skip = (page - 1) * limit
        const query = search ? {
            $or: [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
                { nationality: { $regex: search, $options: 'i' } },
                ...(!/[^0-9]/.test(search) ? [{ phoneNumber: search }] : []),
            ]
        } : {};

        const surveys = await Survey.find(query)
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 })

        const totalSurveys = await Survey.countDocuments(query)

        return {
            surveys,
            totalItems: totalSurveys,
            currentPage: page,
            totalPages: Math.ceil(totalSurveys / limit)
        }
    } catch (error) {
        throw error
    }
}

export default { login, getSurveySubmission }
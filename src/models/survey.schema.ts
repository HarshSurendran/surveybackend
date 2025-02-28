import mongoose, { Schema, Document } from "mongoose";

export interface ISurvey extends Document {
    name: string;
    gender: string;
    nationality: string;
    email: string;
    phone: number;
    address: string;
    message: string;
}

const SurveySchema = new Schema<ISurvey>({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    gender: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        enum:['male','female','other']
    },
    nationality: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    phone: {
        type: Number,
        required: true,
        trim: true,
    },
    address: {
        type: String,
        required: true,
        trim: true,
    },
    message: {
        type: String,
        required: true,
        trim: true,
    },
}, { timestamps: true });

const Survey = mongoose.model<ISurvey>("Survey", SurveySchema);
export default Survey
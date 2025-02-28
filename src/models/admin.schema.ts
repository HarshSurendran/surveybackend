import mongoose, { Schema, Document } from "mongoose";

export interface IAdmin extends Document {
    email: string;
    password: string;
}

const AdminSchema = new Schema<IAdmin>({
    email: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    }
}, { timestamps: true });


const Admin = mongoose.model<IAdmin>("Admin", AdminSchema);
export default Admin
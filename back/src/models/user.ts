import { Schema, Types, model } from "mongoose";

interface IUser {
    email: string;
    password: string;
    lastname: string;
    firstname: string;
    role: string;
    inscriptionDate: Date;
}

const userSchema = new Schema<IUser>({
    email: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    lastname: { type: String, required: true, trim: true },
    firstname: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    inscriptionDate: { type: Date, required: true },
})

const User = model<IUser>('users', userSchema);

export { IUser, User }
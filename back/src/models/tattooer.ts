import { Date, Number, Schema, Types, model } from "mongoose";
import { IUser } from "./user";
import { ILink } from "./link";

interface ITattooer extends IUser {
    surname: string;
    place: string;
    links: ILink;
    styles: T;
}

const tattooerSchema = new Schema<ITattooer>({
    email: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    lastname: { type: String, required: true, trim: true },
    firstname: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    inscriptionDate: { type: Date, required: true },
    surname: { type: String, required: true, trim: true },
    place: { type: String, required: true, trim: true },
    links: {
        name: { type: String, required: true, trim: true },
        url: { type: String, required: true, trim: true },
    },
    styles: [{
        name: { type: String, required: true, trim: true, lowercase: true }
    }]
})

const Tattooer = model<ITattooer>('tattooers', tattooerSchema);

export { ITattooer, Tattooer }
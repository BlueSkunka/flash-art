import { url } from "inspector";
import { Date, Number, Schema, Types, model } from "mongoose";


interface ILink {
    name: string;
    url: string;
}

const linkSchema = new Schema<ILink>({
    name: { type: String, required: true, trim: true },
    url: { type: String, required: true, trim: true }
})

const Link = model<ILink>('links', linkSchema);

export { ILink, linkSchema }
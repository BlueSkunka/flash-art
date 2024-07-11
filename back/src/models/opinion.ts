import { Schema, Types, model } from "mongoose";
import { IUser } from "./user";
import { ITattooer } from "./tattooer";
import { IFlash } from "./flash";

interface IOpinion {
    user: IUser,
    tattooer: ITattooer,
    flash: IFlash,
    rate: number,
    commentary: string,
    createdAt: Date
}

const opinionSchema = new Schema<IOpinion>({
    user: { type: Types.ObjectId, required: true },
    tattooer: { type: Types.ObjectId, required: true },
    flash: { type: Types.ObjectId, required: true },
    rate: { type: Number, required: true },
    commentary: { type: String },
    createdAt: { type: Date, required: true }
})

const Opinion = model<IOpinion>('opinions', opinionSchema);

export { IOpinion, Opinion }
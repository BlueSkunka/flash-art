import { Schema, Types, model } from "mongoose";

interface IOpinion {
    user: Types.ObjectId,
    tattooer: Types.ObjectId,
    flash: Types.ObjectId,
    rate: number,
    commentary: string
}

const opinionSchema = new Schema<IOpinion>({
    user: { type: Types.ObjectId, required: true },
    tattooer: { type: Types.ObjectId, required: true },
    flash: { type: Types.ObjectId, required: true },
    rate: { type: Number, required: true },
    commentary: { type: String }
})

const Opinion = model<IOpinion>('opinions', opinionSchema);

export { IOpinion, Opinion }
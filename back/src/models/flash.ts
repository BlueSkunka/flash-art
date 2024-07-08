import { Schema, Date, Types, model } from "mongoose";

interface IFlash {
    place: string;
    flashDate: Date;
    tattooer: Types.ObjectId;
    user: Types.ObjectId;
}

const flashSchema = new Schema<IFlash>({
    place: { type: String, required: true, trim: true },
    flashDate: { type: Date, required: true },
    tattooer: { type: Types.ObjectId, required: true },
    user: { type: Types.ObjectId },
})

const Flash = model<IFlash>('flashs', flashSchema);

export { IFlash, Flash };
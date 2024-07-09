import { Schema, Date, Types, model } from "mongoose";

interface IFlash {
    place: string;
    flashDate: Date;
    tattooer: Types.ObjectId;
    user: Types.ObjectId;
    name: string;
    description: string;
    price: number;
}

const flashSchema = new Schema<IFlash>({
    place: { type: String, required: true, trim: true },
    flashDate: { type: Date, required: true },
    tattooer: { type: Types.ObjectId, required: true },
    user: { type: Types.ObjectId },
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true, trim: true },
})

const Flash = model<IFlash>('flashs', flashSchema);

export { IFlash, Flash };
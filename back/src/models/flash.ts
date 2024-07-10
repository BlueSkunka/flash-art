import { Schema, Date, Types, model } from "mongoose";
import { IStyle } from "./style";
import DbTable from "../enums/dbTable";
import { ITattooer } from "./tattooer";
import { IUser } from "./user";

interface IFlash {
    place: string;
    flashDate: Date;
    tattooer: ITattooer;
    user: IUser;
    name: string;
    description: string;
    price: number;
    location: {
        type: { type: String },
        coordinates: [Number],
    };
    styles: IStyle[];
}

const flashSchema = new Schema<IFlash>({
    place: { type: String, required: true, trim: true },
    flashDate: { type: Date, required: true },
    tattooer: { type: Types.ObjectId, required: true, ref: DbTable.TATTOOERS },
    user: { type: Types.ObjectId, ref: DbTable.USERS },
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true, trim: true },
    location: {
        type: {
            type: String,
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    styles: [{
        name: { type: String, required: true, trim: true, lowercase: true }
    }]
})

const Flash = model<IFlash>(DbTable.FLASHES, flashSchema);

export { IFlash, Flash };
import { Schema, Types, model } from "mongoose";
import { IStyle } from "./style";

interface ISearchFilter {
    name: string;
    user: Types.ObjectId;
    location: {
        type: { type: string },
        coordinates: [number],
    };
    maxRange: number;
    tattooer: Types.ObjectId;
    style: IStyle[];
    favourite: boolean;
    minDate: Date;
    maxDate: Date;
    minPrice: number;
    maxPrice: number;
}

const searchFilterSchema = new Schema<ISearchFilter>({
    name: { type: String, required: true, trim: true },
    user: { type: Types.ObjectId, required: true },
    location: {
        type: {
            type: String,
            enum: ['Point'], // 'location.type' must be 'Point'
        },
        coordinates: { type: [Number] }
    },
    maxRange: { type: Number },
    tattooer: { type: Types.ObjectId },
    styles: [{
        name: { type: String, required: true, trim: true, lowercase: true }
    }],
    favourite: { type: Boolean },
    minDate: { type: Date },
    maxDate: { type: Date },
    minPrice: { type: Number },
    maxPrice: { type: Number }
})

const SearchFilter = model<ISearchFilter>('searchFilters', searchFilterSchema);

export { ISearchFilter, SearchFilter };
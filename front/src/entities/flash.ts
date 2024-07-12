import type {Tattooer} from "@/entities/tattooer";
import type {User} from "@/entities/user";
import type {Style} from "primevue/usestyle";

class Flash {
    _id: number;
    place: string;
    flashDate: Date;
    tattooer: Tattooer;
    user: User;
    name: string;
    description: string;
    price: number;
    styles: Style[];
    location: {
        type: { type: String },
        coordinates: [Number],
    };
    styles: Style[]

    constructor(
        _id: number,
        place: string,
        flashDate: Date,
        tattooer: Tattooer,
        user: User,
        name: string,
        description: string,
        price: number,
        styles: Style[],
        location: {
            type: { type: String },
            coordinates: [Number],
        },
        styles: Style[]
    ) {
        this._id = _id;
        this.place = place;
        this.flashDate = flashDate;
        this.tattooer = tattooer;
        this.user = user;
        this.name = name;
        this.description = description;
        this.price = price;
        this.styles = styles;
        this.location = location;
        this.styles = styles
    }
}

export {Flash}
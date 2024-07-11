import type {Tattooer} from "@/entities/tattooer";

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
        }
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
    }
}

export {Flash}
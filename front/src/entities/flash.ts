import type {Tattooer} from "@/entities/tattooer";

class Flash {
    place: string;
    flashDate: Date;
    tattooer: Tattooer;
    user: User;
    name: string;
    description: string;
    price: number;
    location: {
        type: { type: String },
        coordinates: [Number],
    };

    constructor(
        place: string,
        flashDate: Date,
        tattooer: Tattooer,
        user: User,
        name: string,
        description: string,
        price: number,
        location: {
            type: { type: String },
            coordinates: [Number],
        }
    ) {
        this.place = place;
        this.flashDate = flashDate;
        this.tattooer = tattooer;
        this.user = user;
        this.name = name;
        this.description = description;
        this.price = price;
        this.location = location;
    }
}

export {Flash}
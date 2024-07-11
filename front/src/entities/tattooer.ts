import type {Opinion} from "@/entities/opinion";
import {User} from "@/entities/user";
import type {Flash} from "@/entities/flash";

class Tattooer extends User {
    surname: string
    place: string
    links: Link[];
    styles: Style[];
    description: string;
    location: {
        type: { type: string },
        coordinates: [number],
    };
    opinions: Opinion[];
    flashes: Flash[];

    constructor(
        _id: number,
        email: string,
        password: string,
        lastname: string,
        firstname: string,
        role: string,
        surname: string,
        place: string,
        links: Link[],
        styles: Style[],
        description: string,
        location: {
            type: { type: string },
            coordinates: [number],
        },
        opinion: Opinion[],
        flashes: Flash[]
    ) {
        super(
            _id,
            email,
            password,
            lastname,
            firstname,
            role
        );

        this.surname = surname;
        this.place = place;
        this.links = links;
        this.styles = styles;
        this.description = description;
        this.location = location;
        this.opinions = opinion
        this.flashes = flashes
    }
}

export {Tattooer}
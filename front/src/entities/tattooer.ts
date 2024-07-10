class Tattooer extends User {
    surname: string
    place: string
    links: Link[];
    styles: Style[];
    description: string;
    location: {
        type: { type: string },
        coordinates: [number],
    }

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
        }
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
    }
}

export {Tattooer}
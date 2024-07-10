class Address {
    coordinates: {
        long: number,
        lat: number
    }

    label: string

    constructor(coordinates: { long: number, lat: number }, label: string) {
        this.coordinates = coordinates;
        this.label = label;
    }
}

export {Address}
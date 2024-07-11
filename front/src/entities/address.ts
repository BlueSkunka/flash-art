class Address {
    coordinates: {
        long: number,
        lat: number
    }

    label: string

    constructor(label: string, coordinates: { long: number, lat: number } = {long: 0, lat: 0}) {
        this.coordinates = coordinates;
        this.label = label;
    }
}

export {Address}
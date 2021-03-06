export interface ICar {
    yearMade: Number,
    imgUrl: [{ image: string, thumbImage: string, alt: string, order: number }],
    price: Number,
    make: string,
    variant: string,
    condition: string,
    horsePower: Number,
    gears: string,
    type: string,
    currency: string,
    documents: string,
    dateMade: string,
    mileage: Number,
    color: string,
    country: string,
    description: string,
    model: string,
    city: string,
    __v: Number,
    _id: string,
    engine: string,
    owner: {
        _id: string;
        telephone: number;
        username: string;
    }
}

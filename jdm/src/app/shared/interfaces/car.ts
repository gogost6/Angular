export interface ICar {
    yearMade: Number,
    price: Number,
    make: string,
    variant: string,
    condition: string,
    horsePower: Number,
    gears: string,
    type: string,
    currency: string,
    documents: string,
    dateMade: {
        $date: string
    },
    mileage: Number,
    color: string,
    country: string,
    description: string,
    model: string,
    city: string,
    __v: Number
}

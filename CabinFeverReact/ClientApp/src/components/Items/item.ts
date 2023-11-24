export interface Item {
    id: number;
    name: string;
    pricePerNight: number;
    fromDate: Date;
    toDate: Date;
    capacity: number;
    description: string;
    //fylke?: string;
    location: string;
    imageUrl: string;
    isAvailable?: boolean;
    //userId?: string;
    //user?: {
        // Assuming IdentityUser has an id and other properties you want to use
        //id: string;
        // ... other properties
    //};
    //orders?: Order[]; // Assuming you have a similar Order type
    //itemAvailabilities?: ItemAvailability[]; // Assuming you have a similar type
}

interface Order {
    // Define your Order properties here
}

interface ItemAvailability {
    // Define your ItemAvailability properties here
}

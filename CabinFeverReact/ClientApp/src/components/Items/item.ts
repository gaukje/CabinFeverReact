// export interface for item properties
export interface Item {
    id: number; // unique identifier for the item
    name: string; // name of the item
    pricePerNight: number; // price per night for renting the item
    fromDate: Date; // available from date
    toDate: Date; // available to date
    capacity: number; // how many people can it accommodate
    description: string; // description of the item
    location: string; // where is the item located
    imageUrl: string; // url for the item's image
}

// interface for order properties
interface Order {
    
}

// interface for item availability properties
interface ItemAvailability {
    
}

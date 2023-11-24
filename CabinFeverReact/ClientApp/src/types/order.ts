export interface Order {
    OrderId: number;
    OrderDate: Date;
    UserId?: string;
    // User?: IdentityUser; // IdentityUser m� ogs� defineres i TypeScript hvis du skal bruke den
    TotalPrice: number;
    ItemId: number;
    // Item?: Item; // Item m� ogs� defineres i TypeScript hvis du skal bruke den
    FromDate: Date;
    ToDate: Date;
    Guests: number;
}

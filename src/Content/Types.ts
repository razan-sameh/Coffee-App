export type typCategory = {
    ID: number,
    title: string
};
export type typProduct = {
    ID: number,
    title: string,
    price: number,
    category: number,
    description: string,
    image: string[],
    rate: number
};
export type typPriceRange = {
    intMin: number,
    intMax: number
};
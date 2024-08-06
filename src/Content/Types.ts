import { Size } from "./Enums";

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
export type typCart = {
    Uid: string,
    productID: number,
    size: Size,
    count: number,
    price:number
};
export type typRange = {
    intMin: number,
    intMax: number
};
export type typLogin = {
    strEmail: string,
    strPassword: string
}
export type typSignUp = {
    strEmail: string,
    strPassword: string,
    strFullName: string,
    strPhoneNumber: string
}
export type typCheckout = {
    strFullName: string,
    strPhoneNumber: string
    strAddress: string,
}

export type typUser = {
    Uid: string,
    name: string,
    phoneNumber: string
    address: string,
    password:string
}
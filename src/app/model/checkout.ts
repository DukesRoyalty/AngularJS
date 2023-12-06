import { Item } from "./item";

export interface Checkout {
    id: number,
    item: Item,
    store: string;
    date: string;
    success: boolean;
}
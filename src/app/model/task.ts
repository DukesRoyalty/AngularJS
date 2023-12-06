import { Item } from "./item";

export interface Task {
    id: string;
    store: string;
    item: Item;
    status: string;
    profile: string;
    proxy: string;
    date?: string;
}

import { WishListEntryRequest } from "./WishListEntryRequest";

export interface WishListRequest {
    name: string;
    description: string;
    private: boolean;
    items: WishListEntryRequest[];
}
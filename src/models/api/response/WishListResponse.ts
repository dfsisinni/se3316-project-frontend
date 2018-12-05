import { WishListEntryResponse } from "./WishListEntryResponse";

export interface WishListResponse {
    id: string;
    name: string;
    description: string;
    private: boolean;
    items: WishListEntryResponse[];
    userId: string;
}
import { WishListResponse } from "src/models/api/response/WishListResponse";

export interface SetMyWishListsAction {
    wishLists: WishListResponse[];
}
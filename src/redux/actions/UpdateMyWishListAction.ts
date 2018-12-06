import { WishListResponse } from "src/models/api/response/WishListResponse";

export interface UpdateMyWishListAction {
    index: number;
    response: WishListResponse;
}
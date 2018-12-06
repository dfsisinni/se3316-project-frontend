import { UserType } from "src/models/api/UserType";
import { ShoppingCart } from './ShoppingCart'
import { WishListResponse } from "src/models/api/response/WishListResponse";

export interface User {
    id: string;
    email: string;
    type: UserType;
    active: boolean;
    token: string;
    shoppingCart: ShoppingCart;
    wishLists: WishListResponse[];
}
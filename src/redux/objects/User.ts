import { UserType } from "src/models/api/UserType";
import { ShoppingCart } from './ShoppingCart'

export interface User {
    id: string;
    email: string;
    type: UserType;
    active: boolean;
    token: string;
    shoppingCart: ShoppingCart;
}
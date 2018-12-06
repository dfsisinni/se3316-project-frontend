import { User } from "./objects/User";
import { ItemResponse } from "src/models/api/response/ItemResponse";
import { WishListResponse } from "src/models/api/response/WishListResponse";
import { Manager } from "./objects/Manager";

export interface AppState {
    title: string;
    user: User;
    store: ItemResponse[];
    otherLists: WishListResponse[];
    manager: Manager;
}
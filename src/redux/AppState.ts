import { User } from "./objects/User";
import { ItemResponse } from "src/models/api/response/ItemResponse";
import { WishListResponse } from "src/models/api/response/WishListResponse";
import { Manager } from "./objects/Manager";
import { PolicyResponse } from "src/models/api/response/PolicyResponse";

export interface AppState {
    title: string;
    user: User;
    store: ItemResponse[];
    otherLists: WishListResponse[];
    manager: Manager;
    policies: PolicyResponse[];
}
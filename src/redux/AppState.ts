import { User } from "./objects/User";
import { ItemResponse } from "src/models/api/response/ItemResponse";

export interface AppState {
    title: string;
    user: User;
    store: ItemResponse[];
}
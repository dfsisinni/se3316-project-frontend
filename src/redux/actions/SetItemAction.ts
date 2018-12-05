import { ItemResponse } from "src/models/api/response/ItemResponse";

export interface SetItemAction {
    items: ItemResponse[];
}
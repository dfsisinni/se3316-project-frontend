import { ShoppingCartEntry } from "../objects/ShoppingCartEntry";

export interface PurchaseItemsAction {
    items: ShoppingCartEntry[];
}
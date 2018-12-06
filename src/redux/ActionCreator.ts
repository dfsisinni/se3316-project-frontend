import { UserInfoResponse } from "src/models/api/response/UserInfoResponse";
import { Action } from './Action';
import { LoginAction } from "./actions/LoginAction";
import { ActionType } from "./ActionType";
import { ChangeStoreQuantityAction } from "./actions/ChangeStoreQuantityAction";
import { ItemResponse } from "src/models/api/response/ItemResponse";
import { SetItemAction } from "./actions/SetItemAction";
import { RemoveItemFromCart } from "./actions/RemoveItemFromCart";
import { ShoppingCartEntry } from "./objects/ShoppingCartEntry";
import { PurchaseItemsAction } from "./actions/PurchaseItemsAction";


export class ActionCreator {
    private constructor() {
    }

    public static createLoginAction(token: string, info: UserInfoResponse): Action<LoginAction> {
        const loginAction: LoginAction = {
            token: token,
            infoResponse: info
        };

        return ActionCreator.createAction(loginAction, ActionType.LOGIN);
    }

    public static createChangeStoreQuantityAction(itemId: string, storeDelta: number, cartIndex): Action<ChangeStoreQuantityAction> {
        const action: ChangeStoreQuantityAction = {
            itemId: itemId,
            storeDelta: storeDelta,
            cartIndex: cartIndex
        };

        return ActionCreator.createAction(action, ActionType.CHANGE_STORE_QUANTITY);
    }

    public static setItemAction(items: ItemResponse[]) {
        const action: SetItemAction = {
            items: items
        };

        return ActionCreator.createAction(action, ActionType.SET_ITEM_ACTION);
    }

    public static removeItemFromCart(index: number) {
        const action: RemoveItemFromCart = {
            cartIndex: index
        };

        return ActionCreator.createAction(action, ActionType.REMOVE_ITEM_FROM_CART);
    }

    public static createClearCartAction() {
        return ActionCreator.createAction(undefined, ActionType.REMOVE_ALL_FROM_CART);
    }

    public static createPurchaseItemsAction(items: ShoppingCartEntry[]) {
        const action: PurchaseItemsAction = {
            items: items
        };

        return ActionCreator.createAction(action, ActionType.BUY_ITEMS);
    }

    private static createAction<T>(action: T, type: ActionType): Action<T> {
        return {
            payload: action,
            type: type
        };
    }
}
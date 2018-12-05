import { UserInfoResponse } from "src/models/api/response/UserInfoResponse";
import { Action } from './Action';
import { LoginAction } from "./actions/LoginAction";
import { ActionType } from "./ActionType";
import { ChangeStoreQuantityAction } from "./actions/ChangeStoreQuantityAction";
import { ItemResponse } from "src/models/api/response/ItemResponse";
import { SetItemAction } from "./actions/SetItemAction";


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

    public static createChangeStoreQuantityAction(storeIndex: number, storeDelta: number, cartIndex): Action<ChangeStoreQuantityAction> {
        const action: ChangeStoreQuantityAction = {
            storeIndex: storeIndex,
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

    private static createAction<T>(action: T, type: ActionType): Action<T> {
        return {
            payload: action,
            type: type
        };
    }
}
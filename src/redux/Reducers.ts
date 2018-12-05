import { Action } from './Action';
import { AppState } from "./AppState";
import { ActionType } from './ActionType';
import { LoginAction } from './actions/LoginAction';
import { ChangeStoreQuantityAction } from './actions/ChangeStoreQuantityAction';
import { SetItemAction } from './actions/SetItemAction';

const initialState: AppState = {
    title: "Lab 5",
    user: undefined,
    store: []
};

export default function app(state: AppState = initialState, action: Action<any>): AppState {
    if (action.type === ActionType.LOGIN) {
        const props = action.payload as LoginAction;
        return {
            ...state,
            user: {
                ...props.infoResponse,
                token: props.token,
                shoppingCart: {
                    items: []
                }
            }
        };
    } else if (action.type === ActionType.CHANGE_STORE_QUANTITY) {
        const props = action.payload as ChangeStoreQuantityAction;

        const newState = {
            ...state
        };

        newState.user.shoppingCart.items[props.cartIndex].quantity -= props.storeDelta;
        newState.store[props.storeIndex].quantity += props.storeDelta;

        return newState;
    } else if (action.type === ActionType.SET_ITEM_ACTION) {
        const props = action.payload as SetItemAction;

        return {
            ...state,
            store: props.items
        };
    }
 
    return state;
}
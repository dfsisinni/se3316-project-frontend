import { Action } from './Action';
import { AppState } from "./AppState";
import { ActionType } from './ActionType';
import { LoginAction } from './actions/LoginAction';
import { ChangeStoreQuantityAction } from './actions/ChangeStoreQuantityAction';
import { SetItemAction } from './actions/SetItemAction';
import { RemoveItemFromCart } from './actions/RemoveItemFromCart';

const initialState: AppState = {
    title: "Lab 5",
    user: undefined,
    store: []
};

export default function app(state: AppState = initialState, action: Action<any>): AppState {
    console.log(action);

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

        if (props.cartIndex === -1) {
            const item = newState.user.shoppingCart.items.find((it) => it.itemId === props.itemId);
            if (item) {
                item.quantity -= props.storeDelta;
            } else {
                newState.user.shoppingCart.items.push({
                    quantity: -props.storeDelta,
                    itemId: props.itemId
                });
            }
        } else {
            newState.user.shoppingCart.items[props.cartIndex].quantity -= props.storeDelta;
        }

        const itemInStore = newState.store.find(it => it.id === props.itemId);
        itemInStore.quantity += props.storeDelta;

        return newState;
    } else if (action.type === ActionType.SET_ITEM_ACTION) {
        const props = action.payload as SetItemAction;

        return {
            ...state,
            store: props.items
        };
    } else if (action.type === ActionType.REMOVE_ITEM_FROM_CART) {
        const props = action.payload as RemoveItemFromCart;

        const item = state.user.shoppingCart.items[props.cartIndex];
        const newState = {
            ...state,
        };

        newState.user.shoppingCart.items = [...state.user.shoppingCart.items.slice(0, props.cartIndex),
                                            ...state.user.shoppingCart.items.slice(props.cartIndex + 1)];
        
        const storeItem = newState.store.find((it) => it.id === item.itemId);
        storeItem.quantity += item.quantity;

        return newState;
    } else if (action.type === ActionType.REMOVE_ALL_FROM_CART) {
        const newState = {
            ...state,
        };
        const items = newState.user.shoppingCart.items;
        newState.user.shoppingCart.items = [];

        for (let item of items) {
            const storeItem = newState.store.find((it) => it.id === item.itemId);
            storeItem.quantity += item.quantity;
        }

        return newState;
    } else if (action.type === ActionType.BUY_ITEMS) {
        const newState = {
            ...state,
        };
        newState.user.shoppingCart.items = [];
        return newState;
    }
 
    return state;
}
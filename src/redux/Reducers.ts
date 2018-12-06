import { Action } from './Action';
import { AppState } from "./AppState";
import { ActionType } from './ActionType';
import { LoginAction } from './actions/LoginAction';
import { ChangeStoreQuantityAction } from './actions/ChangeStoreQuantityAction';
import { SetItemAction } from './actions/SetItemAction';
import { RemoveItemFromCart } from './actions/RemoveItemFromCart';
import { AddCommentAction } from './actions/AddCommentAction';
import { SetMyWishListsAction } from './actions/SetMyWishListsAction';
import { AddMyWishListAction } from './actions/AddMyWishListAction';
import { DeleteMyWishListAction } from './actions/DeleteMyWishListAction';
import { UpdateMyWishListAction } from './actions/UpdateMyWishListAction';
import { SetManagerUsersAction } from './actions/SetManagerUsersAction';
import { UpdateUserAction } from './actions/UpdateUserAction';
import { ReplaceItemAction } from './actions/ReplaceItemAction';
import { DeleteItemAction } from './actions/DeleteItemAction';
import { SetPoliciesAction } from './actions/SetPoliciesAction';

const initialState: AppState = {
    title: "Lab 5",
    user: undefined,
    store: [],
    otherLists: [],
    manager: {
        users: []
    },
    policies: []
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
                },
                wishLists: []
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
    } else if (action.type === ActionType.ADD_COMMENT) {
        const props = action.payload as AddCommentAction;

        const newState = {
            ...state
        };

        const item = newState.store.find(x => x.id === props.itemId);
        item.comments.push(props.comment);

        return newState;
    } else if (action.type === ActionType.SET_MY_WISH_LISTS) {
        const props = action.payload as SetMyWishListsAction;

        return {
            ...state,
            user: {
                ...state.user,
                wishLists: props.wishLists
            }
        };
    } else if (action.type === ActionType.ADD_MY_WISH_LIST) {
        const props = action.payload as AddMyWishListAction;

        return {
            ...state,
            user: {
                ...state.user,
                wishLists: [
                    ...state.user.wishLists,
                    props.wishList
                ]
            }
        };
    } else if (action.type === ActionType.DELETE_MY_WISH_LIST) {
        const props = action.payload as DeleteMyWishListAction;

        return {
            ...state,
            user: {
                ...state.user,
                wishLists: [
                    ...state.user.wishLists.slice(0, props.index),
                    ...state.user.wishLists.slice(props.index + 1)
                ]
            }
        };
    } else if (action.type === ActionType.UPDATE_MY_WISH_LIST) {
        const props = action.payload as UpdateMyWishListAction;

        const newState = {
            ...state
        };
        newState.user.wishLists[props.index] = props.response;

        return newState;
    } else if (action.type === ActionType.SET_OTHER_WISH_LISTS) {
        const props = action.payload as SetMyWishListsAction;

        return {
            ...state,
            otherLists: props.wishLists
        };
    } else if (action.type === ActionType.SET_MANAGER_USERS) {
        const props = action.payload as SetManagerUsersAction;

        return {
            ...state,
            manager: {
                ...state.manager,
                users: props.users
            }
        };
    } else if (action.type === ActionType.UPDATE_MANAGER_USER) {
        const props = action.payload as UpdateUserAction;

        const newState = {
            ...state
        };
        const user = newState.manager.users[props.index];
        user.active = props.active;
        user.type = props.type;

        return newState;
    } else if (action.type === ActionType.REPLACE_ITEM) {
        const props = action.payload as ReplaceItemAction;

        const newState = {
            ...state
        };

        const index = newState.store.findIndex(it => it.id === props.item.id);
        newState.store[index] = props.item;

        return newState;
    } else if (action.type === ActionType.DELETE_ITEM_ACTION) {
        const props = action.payload as DeleteItemAction;
        const index = state.store.findIndex((it) => it.id === props.itemId);

        return {
            ...state,
            store: [
                ...state.store.slice(0, index),
                ...state.store.slice(index + 1)
            ]
        };
    } else if (action.type === ActionType.ADD_ITEM_ACTION) {
        const props = action.payload as ReplaceItemAction;
        return {
            ...state,
            store: [
                ...state.store,
                props.item
            ]
        };
    } else if (action.type === ActionType.SET_POLICIES) {
        const props = action.payload as SetPoliciesAction;

        return {
            ...state,
            policies: props.policies
        };
    }
 
    return state;
}
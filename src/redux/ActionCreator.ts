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
import { CommentResponse } from "src/models/api/response/CommentResponse";
import { AddCommentAction } from "./actions/AddCommentAction";
import { WishListResponse } from "src/models/api/response/WishListResponse";
import { SetMyWishListsAction } from "./actions/SetMyWishListsAction";
import { AddMyWishListAction } from "./actions/AddMyWishListAction";
import { DeleteMyWishListAction } from "./actions/DeleteMyWishListAction";
import { UpdateMyWishListAction } from "./actions/UpdateMyWishListAction";
import { SetManagerUsersAction } from "./actions/SetManagerUsersAction";
import { UserType } from "src/models/api/UserType";
import { UpdateUserAction } from "./actions/UpdateUserAction";
import { ReplaceItemAction } from "./actions/ReplaceItemAction";
import { DeleteItemAction } from "./actions/DeleteItemAction";
import { PolicyResponse } from "src/models/api/response/PolicyResponse";
import { SetPoliciesAction } from "./actions/SetPoliciesAction";


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

    public static createSetMyWishListsAction(wishLists: WishListResponse[]) {
        const action: SetMyWishListsAction = {
            wishLists: wishLists
        };

        return ActionCreator.createAction(action, ActionType.SET_MY_WISH_LISTS);
    }

    public static createAddMyWishListAction(wishList: WishListResponse) {
        const action: AddMyWishListAction = {
            wishList: wishList
        };

        return ActionCreator.createAction(action, ActionType.ADD_MY_WISH_LIST);
    }

    public static createAddCommentAction(comment: CommentResponse, itemId: string) {
        const action: AddCommentAction = {
            comment: comment,
            itemId: itemId
        };

        return ActionCreator.createAction(action, ActionType.ADD_COMMENT);
    }

    public static createDeleteMyWishListAction(index: number) {
        const action: DeleteMyWishListAction = {
            index: index
        };

        return ActionCreator.createAction(action, ActionType.DELETE_MY_WISH_LIST);
    }

    public static createUpdateMyWishListAction(index: number, wishList: WishListResponse) {
        const action: UpdateMyWishListAction = {
            index: index,
            response: wishList
        };

        return ActionCreator.createAction(action, ActionType.UPDATE_MY_WISH_LIST);
    }

    public static createSetOtherWishListAction(lists: WishListResponse[]) {
        const action: SetMyWishListsAction = {
            wishLists: lists
        };

        return ActionCreator.createAction(action, ActionType.SET_OTHER_WISH_LISTS);
    }

    public static createUpdateManagerUsersAction(users: UserInfoResponse[]) {
        const action: SetManagerUsersAction = {
            users: users
        };

        return ActionCreator.createAction(action, ActionType.SET_MANAGER_USERS);
    }

    public static createUpdateUserAction(active: boolean, index: number, type: UserType) {
        const action: UpdateUserAction = {
            active: active,
            index: index,
            type: type
        };

        return ActionCreator.createAction(action, ActionType.UPDATE_MANAGER_USER);
    }

    public static createReplaceItemAction(item: ItemResponse) {
        const action: ReplaceItemAction = {
            item: item
        };

        return ActionCreator.createAction(action, ActionType.REPLACE_ITEM);
    }

    public static createDeleteItemAction(itemId: string) {
        const action: DeleteItemAction = {
            itemId: itemId
        };

        return ActionCreator.createAction(action, ActionType.DELETE_ITEM_ACTION);
    }

    public static createAddItemAction(item: ItemResponse) {
        const action: ReplaceItemAction = {
            item: item
        };

        return ActionCreator.createAction(action, ActionType.ADD_ITEM_ACTION);
    }

    public static createSetPoliciesAction(policies: PolicyResponse[]) {
        const action: SetPoliciesAction = {
            policies: policies
        };

        return ActionCreator.createAction(action, ActionType.SET_POLICIES);
    }

    private static createAction<T>(action: T, type: ActionType): Action<T> {
        return {
            payload: action,
            type: type
        };
    }
}
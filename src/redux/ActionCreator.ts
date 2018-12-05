import { UserInfoResponse } from "src/models/api/response/UserInfoResponse";
import { Action } from './Action';
import { LoginAction } from "./actions/LoginAction";
import { ActionType } from "./ActionType";


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

    private static createAction<T>(action: T, type: ActionType): Action<T> {
        return {
            payload: action,
            type: type
        };
    }
}
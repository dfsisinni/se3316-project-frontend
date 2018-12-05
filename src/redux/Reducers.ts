import { Action } from './Action';
import { AppState } from "./AppState";
import { ActionType } from './ActionType';
import { LoginAction } from './actions/LoginAction';

const initialState: AppState = {
    title: "Lab 5",
    user: undefined
};

export default function app(state: AppState = initialState, action: Action<any>): AppState {
    if (action.type === ActionType.LOGIN) {
        const props = action.payload as LoginAction;
        return {
            ...state,
            user: {
                ...props.infoResponse,
                token: props.token
            }
        };
    }

    return state;
}
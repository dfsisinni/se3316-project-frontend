import { Action } from './Action';
import { AppState } from "./AppState";

const initialState: AppState = {
    title: "Lab 5"
};

export default function app(state: AppState = initialState, action: Action): AppState {
    return state;
}
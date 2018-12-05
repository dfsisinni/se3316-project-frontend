import { ActionType } from './ActionType';

export interface Action<T> {
    type: ActionType;
    payload?: T;
}
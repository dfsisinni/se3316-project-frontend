import { UserType } from "src/models/api/UserType";

export interface UpdateUserAction {
    active: boolean;
    type: UserType;
    index: number;
}
import { UserType } from "../UserType";

export interface UpdateUserRequest {
    active: boolean;
    type: UserType;
}
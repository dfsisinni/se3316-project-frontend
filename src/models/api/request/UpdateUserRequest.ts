import { UserType } from "../UserType";

export interface UpdateUserRequest {
    manager: boolean;
    type: UserType;
}
import { UserType } from "../UserType";

export interface UserInfoResponse {
    id: string;
    email: string;
    type: UserType;
    active: boolean;
}
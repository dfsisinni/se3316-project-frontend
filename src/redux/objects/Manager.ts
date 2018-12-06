import { UserInfoResponse } from "src/models/api/response/UserInfoResponse";

export interface Manager {
    users: UserInfoResponse[];
}
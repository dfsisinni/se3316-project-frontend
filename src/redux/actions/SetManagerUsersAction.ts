import { UserInfoResponse } from "src/models/api/response/UserInfoResponse";

export interface SetManagerUsersAction {
    users: UserInfoResponse[];
}
import { UserInfoResponse } from "src/models/api/response/UserInfoResponse";

export interface LoginAction {
    token: string;
    infoResponse: UserInfoResponse;
}
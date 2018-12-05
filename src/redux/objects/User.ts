import { UserType } from "src/models/api/UserType";

export interface User {
    id: string;
    email: string;
    type: UserType;
    active: boolean;
    token: string;
}
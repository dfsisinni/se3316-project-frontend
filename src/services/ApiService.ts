import { UserRequest } from "src/models/api/request/UserRequest";
import * as validate from 'validate.js';
import { Response } from "src/models/api/response/Response";
import { TokenResponse } from "src/models/api/response/TokenResponse";
import { UserInfoResponse } from "src/models/api/response/UserInfoResponse";
import { ItemResponse } from "src/models/api/response/ItemResponse";
import { ShoppingCartEntry } from "src/redux/objects/ShoppingCartEntry";

export class ApiService {
    private static readonly BASE_URL: string = "http://localhost:5000";
    private static readonly EMAIL_CONSTRAINTS = {
        from: {
            email: true
        }
    };


    private constructor () {
    }

    public static async login(email: string, password: string) {
        const userRequest: UserRequest = {
            email: email,
            password: password
        }

        const error = validate({ from: email }, ApiService.EMAIL_CONSTRAINTS);
        if (!email || error) {
            alert("Invalid email!");
            return;
        }

        if (!password) {
            alert("Invalid password!");
            return;
        }

        return fetch(ApiService.BASE_URL + "/api/auth/login", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userRequest)
            })
            .then((response) => response.json())
            .then((response: Response<any>) => {
                if (response.status) {
                    return response as Response<TokenResponse>
                } else {
                    alert(response.response);
                }
            })
            .catch((err) => {
                alert(err);
            });
    }

    public static async register(email: string, password: string) {
        const userRequest: UserRequest = {
            email: email,
            password: password
        }

        const error = validate({ from: email }, ApiService.EMAIL_CONSTRAINTS);
        if (!email || error) {
            alert("Invalid email!");
            return;
        }

        if (!password) {
            alert("Invalid password!");
            return;
        }

        return fetch(ApiService.BASE_URL + "/api/auth/register", {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userRequest)
            })
            .then((response) => response.json())
            .then((response: Response<any>) => {
                if (response.status) {
                    return response as Response<TokenResponse>
                } else {
                    alert(response.response);
                }
            })
            .catch((err) => {
                alert(err);
            });
    }

    public static async me(token: string) {
        return fetch(ApiService.BASE_URL + "/api/auth/me", {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token
            }
        })
        .then((response) => response.json())
        .then((response: Response<any>) => {
            if (response.status) {
                return response as Response<UserInfoResponse>;
            } else {
                alert(response.response);
            }
        })
        .catch((err) => {
            alert(err);
        });
    }

    public static async getItems() {
        return fetch(ApiService.BASE_URL + "/api/item", {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then((response) => response.json())
        .then((response: Response<any>) => {
            if (response.status) {
                return response as Response<ItemResponse[]>;
            } else {
                alert(response.response);
            }
        })
        .catch((err) => {
            alert(err);
        });
    }

    public static async purchaseItem(items: ShoppingCartEntry[], token: string) {
        return fetch(ApiService.BASE_URL + "/api/item", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token
            },
            body: JSON.stringify(items)
        })
        .then((response) => response.json())
        .then((response: Response<any>) => {
            if (response.status) {
                return response as Response<ShoppingCartEntry[]>;
            } else {
                alert(response.response);
            }
        })
        .catch((err) => {
            alert(err);
        });
    }
}
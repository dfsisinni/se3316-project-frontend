import { UserRequest } from "src/models/api/request/UserRequest";
import * as validate from 'validate.js';
import { Response } from "src/models/api/response/Response";
import { TokenResponse } from "src/models/api/response/TokenResponse";
import { UserInfoResponse } from "src/models/api/response/UserInfoResponse";
import { ItemResponse } from "src/models/api/response/ItemResponse";
import { ShoppingCartEntry } from "src/redux/objects/ShoppingCartEntry";
import { CreateCommentRequest } from "src/models/api/request/CreateCommentRequest";
import { CommentResponse } from "src/models/api/response/CommentResponse";
import { WishListResponse } from "src/models/api/response/WishListResponse";
import { WishListRequest } from "src/models/api/request/WishListRequest";
import { UpdateUserRequest } from "src/models/api/request/UpdateUserRequest";
import { ItemRequest } from "src/models/api/request/ItemRequest";
import { ModifyCommentRequest } from "src/models/api/request/ModifyCommentRequest";
import { PolicyResponse } from "src/models/api/response/PolicyResponse";
import { PolicyRequest } from "src/models/api/request/PolicyRequest";

export class ApiService {
    private static readonly BASE_URL: string = "http://localhost:5000";
    private static readonly MANAGER: string = "store manager";
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

        if (email !== ApiService.MANAGER) {
            const error = validate({ from: email }, ApiService.EMAIL_CONSTRAINTS);
            if (!email || error) {
                alert("Invalid email!");
                return;
            }
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

    public static updateItem(request: ItemRequest, token: string, itemId: string) {
        return fetch(ApiService.BASE_URL + "/api/manager/item/" + itemId, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token
            },
            body: JSON.stringify(request)
        })
        .then((response) => response.json())
        .then((response: Response<any>) => {
            if (response.status) {
                return response as Response<string>;
            } else {
                alert(response.response);
            }
        })
        .catch((err) => {
            alert(err);
        });
    }

    public static deleteItem(itemId: string, token: string) {
        return fetch(ApiService.BASE_URL + "/api/manager/item/" + itemId, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token
            }
        })
        .then((response) => response.json())
        .then((response: Response<any>) => {
            if (response.status) {
                return response as Response<string>;
            } else {
                alert(response.response);
            }
        })
        .catch((err) => {
            alert(err);
        });
    }

    public static createItem(request: ItemRequest, token: string) {
        return fetch(ApiService.BASE_URL + "/api/manager/item", {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token
            },
            body: JSON.stringify(request)
        })
        .then((response) => response.json())
        .then((res: Response<any>) => {
            if (res.status) {
                return res as Response<ItemResponse>;
            } else {
                alert(res.response);
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

    public static getPolicies() {
        return fetch(ApiService.BASE_URL + "/api/policy", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/jspn'
            }
        })
        .then((response) => response.json())
        .then((response: Response<any>) => {
            if (response.status) {
                return response as Response<PolicyResponse[]>;
            }

            alert(response.response);
        })
        .catch((err) => {
            alert(err);
        });
    }

    public static updatePolicy(policy: PolicyRequest, policyId: string, token: string) {
        return fetch(ApiService.BASE_URL + "/api/policy/" + policyId, {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token
            },
            body: JSON.stringify(policy)
        })
        .then((response) => response.json())
        .then((response: Response<any>) => {
            if (response.status) {
                return response as Response<string>;
            }

            alert(response.response);
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

    public static async createWishList(wishList: WishListRequest, token: string) {
        return fetch(ApiService.BASE_URL + "/api/wishlist", {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token
            },
            body: JSON.stringify(wishList)
        })
        .then((repsonse) => repsonse.json())
        .then((response: Response<any>) => {
            if (response.status) {
                return response as Response<WishListResponse>;
            } else {
                alert(response.response);
            }
        })
        .catch((err) => {
            alert(err);
        });

    }

    public static async getUsers(token: string) {
        return fetch(ApiService.BASE_URL + "/api/manager/users", {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token
            }
        })
        .then((response) => {
            console.log(response);
            return response.json();
        })
        .then((response: Response<any>) => {
            console.log(response);
            if (response.status) {
                return response as Response<UserInfoResponse[]>;
            } else {
                alert(response.response);
            }
        })
        .catch((err) => {
            console.log(err);
            alert(err);
        });
    }

    public static async updateUser(token: string, request: UpdateUserRequest, userId: string) {
        return fetch(ApiService.BASE_URL + "/api/manager/user/" + userId, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token
            },
            body: JSON.stringify(request)
        })
            .then((res) => res.json())
            .then((response: Response<any>) => {
                if (response.status) {
                    return response as Response<string>;
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

    public static async getOtherWishLists(token: string) {
        return fetch(ApiService.BASE_URL + "/api/wishlist", {
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
                return response as Response<WishListResponse[]>;
            } else {
                alert(response.response);
            }
        })
        .catch((err) => {
            alert(err);
        });
    }

    public static async updateWishList(request: WishListRequest, wishListId: string, token: string) {
        return fetch(ApiService.BASE_URL + "/api/wishlist/" + wishListId, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token
            },
            body: JSON.stringify(request)
        })
        .then((response) => response.json())
        .then((response: Response<any>) => {
            if (response.status) {
                return response as Response<string>;
            } else {
                alert(response.response);
            }
        })
        .catch((err) => {
            alert(err);
        });
    }

    public static async createComment(message: string, rating: number, itemId: string, token: string) {
        const createComment: CreateCommentRequest = {
            comment: message,
            rating: rating,
            itemId: itemId
        }

        return fetch(ApiService.BASE_URL + "/api/comment", {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token
            },
            body: JSON.stringify(createComment)
        })
        .then((response) => response.json())
        .then((response: Response<any>) => {
            if (response.status) {
                return response as Response<CommentResponse>;
            } else {
                alert(response.response);
            }
        })
        .catch((err) => {
            alert(err);
        });
    }

    public static async getMyWishLists(token: string) {
        return fetch(ApiService.BASE_URL + "/api/wishlist/me", {
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
                return response as Response<WishListResponse[]>;
            } else {
                alert(response.response);
            }
        })
        .catch((err) => {
            alert(err);
        });
    }

    public static async deleteMyWishList(token: string, wishListId: string) {
        return fetch(ApiService.BASE_URL + "/api/wishlist/" + wishListId, {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token
            }
        })
        .then((response) => response.json())
        .then((response: Response<any>) => {
            if (response.status) {
                return response as Response<string>;
            } else {
                alert(response.response);
            }
        })
        .catch((err) => {
            alert(err);
        });
    }

    public static async modifyComment(hidden: boolean, token: string, itemId: string, userId: string) {
        const request: ModifyCommentRequest = {
            hidden: hidden
        };

        return fetch(ApiService.BASE_URL + "/api/manager/item/" + itemId + "/comment/" + userId, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token
            },
            body: JSON.stringify(request)
        })
        .then((response) => response.json())
        .then((response: Response<any>) => {
            if (response.status) {
                return response as Response<string>;
            } else {
                alert(response.response);
            }
        })
        .catch((err) => {
            alert(err);
        });
    }
}
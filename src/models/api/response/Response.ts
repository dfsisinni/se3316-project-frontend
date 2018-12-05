export class Response<T> {
    response: T;
    status: boolean;

    constructor (response: T, status: boolean) {
        this.response = response;
        this.status = status;
    }

    public static of<T>(response: T, status: boolean): Response<T> {
        return {
            response: response,
            status: status
        };
    }
}
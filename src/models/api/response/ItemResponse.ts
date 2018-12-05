import { CommentResponse } from "./CommentResponse";

export interface ItemResponse {
    id: string,
    name: string;
    description: string;
    quantity: number;
    price: number;
    comments: CommentResponse[];
}